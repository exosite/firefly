*** Settings ***
Documentation    Test suite of success
Library           BuiltIn
Library           Collections
Library           ExoJSONSchemaLibrary.py
Library           RequestsLibrary

Suite Setup    SuiteSetup
Test Timeout    300

*** Test Cases ***
Call firebase should success
    ${resp} =    Post Request    solution    /firebase/send    data={"Authorization":"key=AIzaSyBlBNW9MBFlQ4BGG-3n3R7475D39vo3Zd8","registration_ids" : ["dpbboSHKnTE:APA91bFIvxW7XCl5LfPUkbzd5EGFvMgETIj9VOo9iIhtMa3XuO1ho5bG5UtyluTToYl6YNMlWeArt7OjwyfaSCJxxYU-Y0Q_gAbUvYtDuwj-6z6HxpULNL6seTTXdSM0NZy-I4xEk_-fihOSEd_AvCkvEpE3v-2yyA"],"notification":{"body":"Your air purifier need to change filter now!!!","title":"Change filter reminder"},"priority":10,"data":{"payload":{"k1":"v1","k2":"v2"}}}    headers=&{headers}
    Verify Status Code As Expected    ${resp}    200
    Verify Schema    firebase.json    success    ${resp.json()}

Call firebase with invalid authorization should fail
    ${resp} =    Post Request    solution    /firebase/send    data={"Authorization":"key=AIzaSyBlBNW9MBFlQ4BGG","registration_ids" : ["dpbboSHKnTE:APA91bFIvxW7XCl5LfPUkbzd5EGFvMgETIj9VOo9iIhtMa3XuO1ho5bG5UtyluTToYl6YNMlWeArt7OjwyfaSCJxxYU-Y0Q_gAbUvYtDuwj-6z6HxpULNL6seTTXdSM0NZy-I4xEk_-fihOSEd_AvCkvEpE3v-2yyA"],"notification":{"body":"Your air purifier need to change filter now!!!","title":"Change filter reminder"},"priority":10,"data":{"payload":{"k1":"v1","k2":"v2"}}}    headers=&{headers}
    Verify Status Code As Expected    ${resp}    200
    Verify Dispatcher Service Error Response    ${resp}    Invalid (legacy) Server-key delivered or Sender is not authorized to perform request.    401    QueryError

Call firebase without authorization should fail
    ${resp} =    Post Request    solution    /firebase/send    data={"registration_ids" : ["dpbboSHKnTE:APA91bFIvxW7XCl5LfPUkbzd5EGFvMgETIj9VOo9iIhtMa3XuO1ho5bG5UtyluTToYl6YNMlWeArt7OjwyfaSCJxxYU-Y0Q_gAbUvYtDuwj-6z6HxpULNL6seTTXdSM0NZy-I4xEk_-fihOSEd_AvCkvEpE3v-2yyA"],"notification":{"body":"Your air purifier need to change filter now!!!","title":"Change filter reminder"},"priority":10,"data":{"payload":{"k1":"v1","k2":"v2"}}}    headers=&{headers}
    Verify Status Code As Expected    ${resp}    200
    Verify Dispatcher Service Error Response    ${resp}    [\"Parameter Authorization is required.\"]    400    QueryError

*** Keywords ***
SuiteSetup
    Set Suite Variable    ${domain}    https://winnietest.apps.exosite.io
    Create Session    solution    ${domain}    verify=False
    &{headers} =    Create Dictionary    Content-Type=application/json
    Set Suite Variable    &{headers}

Verify Dispatcher Service Error Response
    [Arguments]    ${resp}    ${error}    ${status}    ${type}
    ${resp} =    Set Variable    ${resp.json()}
    Verify Schema    firebase.json    error    ${resp}
    Verify Object Key Value Contain Expected    ${resp}    error   ${error}
    Verify Object Key Value As Expected    ${resp}    status   ${status}
    Verify Object Key Value As Expected    ${resp}    type   ${type}

Verify Object Key Value As Expected
    [Documentation]    Verify the key value in object is as same as expected value
    [Arguments]    ${object}    ${key}    ${expected}
    ${data} =    Get From Dictionary    ${object}    ${key}
    Should Be Equal As Strings    ${data}    ${expected}

Verify Object Key Value Contain Expected
    [Documentation]    Verify the key value in object contains expected message
    [Arguments]    ${object}    ${key}    ${expected}
    ${data} =    Get From Dictionary    ${object}    ${key}
    Should Contain    ${data}    ${expected}

Verify Status Code As Expected
    [Documentation]    Verify response status code is as same as expected status code
    [Arguments]    ${response}    ${code}
    Should Be Equal As Strings    ${response.status_code}    ${code}