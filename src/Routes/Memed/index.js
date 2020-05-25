import React from 'react';

const Memed = () => {
	const memedUrlParams = new URLSearchParams(window.location.search);
	const memedToken = memedUrlParams.get('token');
	const memedHost = memedUrlParams.get('host');
	const memedPacienteNome = memedUrlParams.get('nome');

	const memedScriptImported = () => {
		const scriptsOnDocument = document.getElementsByTagName('script');
		for (const scriptItem of scriptsOnDocument) {
			if (scriptItem.src.indexOf(memedHost) > 0) {
				return true;
			}
		}
		return false;
	};

	const memedScriptImport = () => {
		const memedScript = document.createElement('script');
		memedScript.setAttribute('type', 'text/javascript');
		memedScript.setAttribute('data-color', '#fff');
		memedScript.setAttribute('data-token', memedToken);
		memedScript.src = `https://${memedHost}/modulos/plataforma.sinapse-prescricao/build/sinapse-prescricao.min.js`;
		document.body.appendChild(memedScript);
	};

	const memedAntesDeObterPrescricao = pacienteNome => {
		if (module.name === 'plataforma.prescricao') {
			MdHub.command.send('plataforma.prescricao', 'setFeatureToggle', {
				buttonClose: false,
			});
		}
		MdHub.command.send('plataforma.prescricao', 'setPaciente', { nome: pacienteNome });
	};

	if (!memedScriptImported()) {
		memedScriptImport();
		const memedLoadingInterval = setInterval(() => {
			try {
				if (window.onMemedScriptLoaded) {
					window.onMemedScriptLoaded();
				}
				clearInterval(memedLoadingInterval);
				setTimeout(() => {
					memedAntesDeObterPrescricao(memedPacienteNome);
					document.getElementById('memed-prescricao').click();
					console.log('API Memed carregada.');
				}, 1000);
			} catch (e) {
				console.log('Aguardando API Memed...');
			}
		}, 300);
	}

	return (
		<div>
			<a id="memed-prescricao" style={{ display: 'none' }}>
				Click-me
			</a>
		</div>
	);
};

export default Memed;
