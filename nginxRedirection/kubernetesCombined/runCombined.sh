kubectl get pods -o yaml > kubernetesInfo.yaml
sudo python combined.py 
sudo service nginx reload