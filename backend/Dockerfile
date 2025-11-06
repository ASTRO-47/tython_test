FROM node:22-bullseye AS base
WORKDIR /app

COPY run_dev.sh /usr/local/bin/run_dev.sh
RUN chmod +x /usr/local/bin/run_dev.sh
CMD ["/usr/local/bin/run_dev.sh"]