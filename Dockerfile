FROM mflo999/pi-run

# install the app
COPY dist.tar.gz /tmp/dist.tar.gz
RUN mkdir /pi-lib
RUN tar -zxf /tmp/dist.tar.gz -C /pi-lib

# start the app
WORKDIR /pi-lib
ENTRYPOINT ["/bin/bash", "./server.sh"]
