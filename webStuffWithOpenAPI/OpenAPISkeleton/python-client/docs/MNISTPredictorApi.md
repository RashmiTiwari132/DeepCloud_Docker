# swagger_client.MNISTPredictorApi

All URIs are relative to *http://localhost:8888*

Method | HTTP request | Description
------------- | ------------- | -------------
[**get_aqi2**](MNISTPredictorApi.md#get_aqi2) | **POST** /MNISTPredictor | 


# **get_aqi2**
> InlineResponse200 get_aqi2(upload)



Allows user to upload MNIST images and get predictions on a pretrained model.

### Example 
```python
from __future__ import print_statement
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint

# create an instance of the API class
api_instance = swagger_client.MNISTPredictorApi()
upload = '/path/to/file.txt' # file | MNIST image

try: 
    api_response = api_instance.get_aqi2(upload)
    pprint(api_response)
except ApiException as e:
    print("Exception when calling MNISTPredictorApi->get_aqi2: %s\n" % e)
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **upload** | **file**| MNIST image | 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: multipart/form-data
 - **Accept**: text

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

