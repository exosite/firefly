from robot.api import logger
from robot.libraries.BuiltIn import BuiltIn
import jsonschema
import os
import json
import requests

class ExoLibrary:

    def __init__(self):
        self.SESSION = requests.Session()
        self.cwd = os.path.abspath(os.path.join(
            os.path.dirname(os.path.abspath(__file__)), os.pardir))
        self.schema_location = self.cwd + '/test_case'
        
    def __request(self, method, append='', **kwargs):
        self.SESSION.headers.update({
            "content-type": "application/json",
            'accept': 'application/json',
            'authorization': 'token d689ecbe175a71efb7f4b0706614fba4cfc39ac1'
        })
        resp = self.SESSION.request(method, "https://bizapi.hosted.exosite.io/api:1" + append, **kwargs)
        if resp.text == "":
            return resp.status_code
        else:
            try:
                return resp.json()
            except ValueError as e:
                return resp.text
        

    def verify_schema(self, schema_filename, schema_name,  sample):
        """Validates the sample JSON against the given schema."""
        schemas_file = json.loads(
            open('{}/{}'.format(self.schema_location, schema_filename)).read())
        schema = schemas_file[schema_name]
        resolver = jsonschema.RefResolver(
            'file://{}'.format(self.schema_location), schema)
        try:
            jsonschema.validate(sample, schema, resolver=resolver)
        except jsonschema.ValidationError as e:
            logger.debug(e)
            print(sample)
            raise jsonschema.ValidationError(
                'Validation error for schema {}: {}'.format(schema_name, e.message))
                
    def update_serviceconfig_via_api(self, solutionId, serviceconfigID, data, token=None):
        """Comment For Update Serviceconfig Via API
            If the user is different with setting.py
            Please input Authorization Token
        """
        resp = self.__request(
            'put', "/solution/{}/serviceconfig/{}".format(solutionId, serviceconfigID), data=data)
        try:
            return resp
        except:
            raise AssertionError(resp)
