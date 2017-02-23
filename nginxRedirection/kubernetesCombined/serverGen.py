def getServerString(url,podIP):
	return "\tlocation /"+url+" { \n \t\t rewrite ^/"+url+"(.*) /$1 break; \n \t\t proxy_pass http://"+podIP+"; \n \t } \n"

#print getServerString("127.0.0.1:8080")


part1String = ''

with open('part1','r') as myFile:
	part1String = myFile.read()

part2String = getServerString("user0","127.0.0.1:8080") + "\n" +  getServerString("user2","127.0.0.1:8081") + "\n" +  getServerString("user3","127.0.0.1:8082")

part3String = ''

with open('part3','r') as myFile:
	part3String = myFile.read()



combined = part1String + part2String + part3String

#print combined

with open("/etc/nginx/nginx.conf", "w") as text_file:
    text_file.write(combined)