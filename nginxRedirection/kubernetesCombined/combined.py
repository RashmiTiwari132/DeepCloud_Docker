import yaml

stream = open("kubernetesInfo.yaml","r")
podInfo = yaml.load(stream)

def getServerString(url,podIP):
	return "\tlocation /"+url+" { \n \t\t rewrite ^/"+url+"(.*) /$1 break; \n \t\t proxy_pass http://"+podIP+"; \n \t } \n"

def generatePart2(podInfo):
	part2 = ""
	for i in range(0,len(podInfo['items'])):
		part2 += getServerString(podInfo['items'][i]['metadata']['ownerReferences'][0]['name'],podInfo['items'][i]['status']['podIP'])
	return part2


part1String = ''
with open('part1','r') as myFile:
	part1String = myFile.read()

part3String = ''
with open('part3','r') as myFile:
	part3String = myFile.read()

combined = part1String + generatePart2(podInfo) + part3String

with open("/etc/nginx/nginx.conf", "w") as text_file:
    text_file.write(combined)

