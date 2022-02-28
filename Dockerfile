FROM node:14.16.0

# make the 'app' folder the current working directory
WORKDIR /app

# install simple http server for serving static content
#RUN npm install -g http-server
RUN npm install -g @vue/cli

COPY . .

# copy both 'package.json' and 'package-lock.json' (if available)
#ADD package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
#COPY . .

# build app for production with minification
#RUN npm run build

EXPOSE 8080
#Versão de Produção
# CMD [ "http-server", "dist" ]
#Versão de Dev
CMD npm install && npm run serve

