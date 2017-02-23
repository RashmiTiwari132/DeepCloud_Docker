import yaml

stream = open("a.yaml","r")
podInfo = yaml.load(stream)


for i in range(0,len(podInfo['items'])):
	print podInfo['items'][i]['metadata']['ownerReferences'][0]['name'],podInfo['items'][i]['status']['podIP']    