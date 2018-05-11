import React from 'react';

import { 
  Button, Image, Input, Divider, Grid, Form 
} from 'semantic-ui-react';

const SaveForm = ({ imageUrl, value, onChange, saveFile }) => {
  return (
    <Form>
      <p>
        <Image src={imageUrl} fluid rounded />
      </p>

      <Divider />

      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={10}>
            <Input 
              focus
              placeholder='Введите название' 
              fluid 
              onChange={onChange}
              value={value} />
          </Grid.Column>
          <Grid.Column width={6} textAlign='right'>
            <Button 
              color='teal'
              disabled={!value.length}
              onClick={saveFile}>
                Сохранить
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
}

export default SaveForm;