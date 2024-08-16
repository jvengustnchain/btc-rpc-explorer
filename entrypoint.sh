#!/bin/sh

STARTUP_DELAY=${STARTUP_DELAY:-}
if ! [ -z "${STARTUP_DELAY}" ]
then
  sleep ${STARTUP_DELAY}
fi

npm start
