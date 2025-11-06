up:
	docker compose -f docker-compose-dev.yml up -d
down:
	docker compose -f docker-compose-dev.yml  down 
re: down up

build:
	docker compose -f docker-compose-dev.yml up --build -d