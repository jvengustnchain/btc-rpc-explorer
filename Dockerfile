FROM node:18
WORKDIR /workspace
COPY . .
RUN npm ci
EXPOSE 3002

ENTRYPOINT [ "./entrypoint.sh" ]
