import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.MNISTApi()
width = 28 # int | width of image (default to 28)
height = 28 # int | height of image (default to 28)
n_class = 10 # int | number of classes (default to 10)
alpha = '0.01' # float | learning rate (default to 0.01)
upload = '/home/shinchan/MNIST_data.zip' # file | [MNIST dataset](https://drive.google.com/open?id=0B-HwpreJA3WzbnZodkJZVWNfUTg)

try: 
    api_response = api_instance.get_aqi(width, height, n_class, alpha, upload)
    pprint(api_response)
except ApiException as e:
    print "Exception when calling MNISTApi->get_aqi: %s\n" % e
