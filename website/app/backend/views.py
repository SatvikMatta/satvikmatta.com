from django.shortcuts import render
import json
# Create your views here.

import pickle
from django.http import HttpResponseNotAllowed, JsonResponse
import numpy as np
import pandas as pd
import datetime
import requests

def get_ndvi_value(arr):
    d = np.array(arr)
    mini = np.min(d)
    maxi = np.max(d)

    def thing(x):
        return (x-mini)/(maxi-mini)

    applything = np.vectorize(thing)

    d = applything(d)

    return np.mean(d)

def get_lst_value(arr):
    d = np.array(arr)
    return np.mean(d[d!=0])
def get_data(lat, lon):
    url_ndvi = f'https://modis.ornl.gov/rst/api/v1/MOD13Q1/subset?latitude={lat}&longitude={lon}&band=250m_16_days_NDVI&startDate=A2023001&endDate=A2023059&kmAboveBelow=3&kmLeftRight=3'
    url_lst = f'https://modis.ornl.gov/rst/api/v1/MOD11A2/subset?latitude={lat}&longitude={lon}&band=LST_Day_1km&startDate=A2023001&endDate=A2023059&kmAboveBelow=3&kmLeftRight=3'
    url_ta = f'https://modis.ornl.gov/rst/api/v1/MOD14A2/subset?latitude={lat}&longitude={lon}&band=FireMask&startDate=A2023001&endDate=A2023059&kmAboveBelow=3&kmLeftRight=3'

    response_ndvi = requests.get(url_ndvi).json()
    response_lst = requests.get(url_lst).json()
    response_ta = requests.get(url_ta).json()

    ndvi_value = get_ndvi_value(response_ndvi['subset'][-1]['data'])
    lst_value = get_lst_value(response_lst['subset'][-1]['data'])
    ta_value = get_lst_value(response_ta['subset'][-1]['data'])

    return ndvi_value, lst_value, ta_value


# Load the model from the file
filename = 'random_forest_model.pkl'
with open(filename, 'rb') as file:
    rf = pickle.load(file)

# Use the model to make predictions
def fire_probability(request):
    if request.method != 'POST':
        # Raise a MethodNotAllowed exception
        return HttpResponseNotAllowed(['POST'])
    request.POST.get('coordinates')

    ## Process Coordinates

    ndvi_value, lst_value, ta_value = get_data(request.POST.get("coord_ns"), request.POST.get("coord_ew"))
    print(ndvi_value)
    print(lst_value)
    print(ta_value)
    predictions = rf.predict(pd.DataFrame(np.array([[ndvi_value, lst_value, ta_value]])))
    print(predictions[0])
    return JsonResponse({"prediction" : predictions[0]})

