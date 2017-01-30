# swagger_client.MNISTApi

All URIs are relative to *http://localhost:8888*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_aqi**](MNISTApi.md#get_aqi) | **POST** /uploadCompleteScript | 


# **get_aqi**
> InlineResponse2001 get_aqi(width, height, n_class, alpha, upload)



Allows user to upload the [MNIST dataset](https://drive.google.com/open?id=0B-HwpreJA3WzbnZodkJZVWNfUTg) and get a trained model based on the parameters specified. Description about the dataset can be found [here](http://yann.lecun.com/exdb/mnist/). 

### Example 
```python
from __future__ import print_statement
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.MNISTApi()
width = 28 # int | width of image (default to 28)
height = 28 # int | height of image (default to 28)
n_class = 10 # int | number of classes (default to 10)
alpha = 0.01 # float | learning rate (default to 0.01)
upload = '/path/to/file.txt' # file | [MNIST dataset](https://drive.google.com/open?id=0B-HwpreJA3WzbnZodkJZVWNfUTg)

try: 
    api_response = api_instance.get_aqi(width, height, n_class, alpha, upload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling MNISTApi->get_aqi: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **width** | **int**| width of image | [default to 28]
 **height** | **int**| height of image | [default to 28]
 **n_class** | **int**| number of classes | [default to 10]
 **alpha** | **float**| learning rate | [default to 0.01]
 **upload** | **file**| [MNIST dataset](https://drive.google.com/open?id&#x3D;0B-HwpreJA3WzbnZodkJZVWNfUTg) | 

### Return type

[**InlineResponse2001**](InlineResponse2001.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: text

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

