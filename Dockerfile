FROM node:18
WORKDIR /workspace
COPY . .
RUN npm ci
CMD npm start
EXPOSE 3002
