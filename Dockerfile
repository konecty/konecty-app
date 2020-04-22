FROM nginx

ADD dist /usr/share/nginx/html
ADD default.conf /etc/nginx/conf.d/

ENV PORT 80
