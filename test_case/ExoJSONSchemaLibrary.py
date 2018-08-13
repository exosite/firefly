from robot.api import logger
from robot.libraries.BuiltIn import BuiltIn
import jsonschema
import os
import json


class ExoJSONSchemaLibrary:

    def __init__(self):
        self.cwd = os.path.abspath(os.path.join(
            os.path.dirname(os.path.abspath(__file__)), os.pardir))
        self.schema_location = self.cwd + '/api'

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
