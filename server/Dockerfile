FROM node:12.10.0-alpine
RUN yarn global add nodemon
COPY . /home/os-one
VOLUME /home/os-one
RUN yarn
WORKDIR /home/os-one
CMD ["nodemon", "-r", "dotenv/config", "src/index.js", "dotenv_config_path=.env.production"]