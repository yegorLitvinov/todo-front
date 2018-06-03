SERVER=root@195.201.27.44
HOME=/home/todo
deploy-front:
	ssh $(SERVER) 'rm -rf $(HOME)/build'
	scp -r build $(SERVER):$(HOME)
	# ssh $(SERVER) 'chown -R todo:todo $(HOME)/build'	
	ssh $(SERVER) 'nginx -t'
	ssh $(SERVER) 'service nginx restart'
