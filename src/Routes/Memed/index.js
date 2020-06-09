import React, {useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Memed = () => {
	const memedUrlParams = new URLSearchParams(window.location.search);
	const memedToken = memedUrlParams.get('token');
	const memedHost = memedUrlParams.get('host');
	const memedPacienteNome = memedUrlParams.get('nome');
	const memedPacienteTelefone = memedUrlParams.get('telefone');

	const [showTimeoutAlert, setShowTimeoutAlert] = useState(false)

	let memedCheckTimeoutCount = 0
	const memedCheckTimeout = setInterval(() => {
		if (document.querySelector('#memed-auto-generated') == null) {
			memedCheckTimeoutCount++;
			if (memedCheckTimeoutCount >= 15) {
				setShowTimeoutAlert(true);
				clearInterval(memedCheckTimeout);
			}
		} else {
			clearInterval(memedCheckTimeout);
		}
	}, 1000);
	
	const memedPopUpClose = () => {
		window.close();
	}	

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

	const memedAntesDeClicarBotaoPrescricao = () => {
		MdHub.command.send('plataforma.prescricao', 'setPaciente', {
			nome: memedPacienteNome,
			telefone: memedPacienteTelefone,
		})
	}	

	const memedAntesDeObterPrescricao = (pacienteNome, pacienteTelefone) => {
		MdHub.command.send('plataforma.prescricao', 'setPaciente', { 
			nome: pacienteNome,
			telefone: pacienteTelefone
		});
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
					memedAntesDeObterPrescricao(memedPacienteNome, memedPacienteTelefone);
					document.getElementById('memed-prescricao').click();
					console.log('API Memed carregada.');
				}, 1000);
			} catch (e) {
				console.log(`Aguardando API Memed... ${e}`);
			}
		}, 300);
	}

	return (
        <div style={{
			position: 'absolute', left: '50%', top: '50%',
			transform: 'translate(-50%, -50%)'
		}}>
			<CircularProgress style={{display: showTimeoutAlert ? 'none' : ''}} size={40} thickness={4} value={100} />
			<div>
				<Typography style={{display: showTimeoutAlert ? '' : 'none'}} variant="subtitle1">Ops! Não foi possível carregar o módulo de prescrições da Memed.</Typography><br />
				<Typography style={{display: showTimeoutAlert ? '' : 'none'}}  variant="subtitle1">Aguarde alguns instantes e tente novamente!</Typography><br />
				<Button style={{display: showTimeoutAlert ? '' : 'none'}}  onClick={memedPopUpClose} variant="outlined" color="primary">Fechar</Button>				
			</div>
            <a id="memed-prescricao" onClick={memedAntesDeClicarBotaoPrescricao} style={{display: 'none'}}>Click-me</a>
        </div>
	);
};

export default Memed;
