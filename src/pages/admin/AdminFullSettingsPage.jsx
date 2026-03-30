import React from 'react';
import { Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const AdminFullSettingsPage = () => {
  const handleSave = () => {
    // Add save functionality here
    alert('Settings saved!');
  };

  return (
    <div className="admin-settings">
      <h1>Admin Settings</h1>
      <Card>
        <CardBody>
          <CardTitle tag="h5">Manage Settings</CardTitle>
          <Form>
            <FormGroup>
              <Label for="siteName">Site Name</Label>
              <Input type="text" id="siteName" placeholder="Enter site name" />
            </FormGroup>
            <FormGroup>
              <Label for="siteEmail">Site Email</Label>
              <Input type="email" id="siteEmail" placeholder="Enter admin email" />
            </FormGroup>
            <FormGroup>
              <Label for="adminPassword">Admin Password</Label>
              <Input type="password" id="adminPassword" placeholder="Enter password" />
            </FormGroup>
            <FormGroup>
              <Label for="timezone">Timezone</Label>
              <Input type="select" id="timezone">
                <option value="UTC">UTC</option>
                <option value="PST">Pacific Standard Time</option>
                <option value="EST">Eastern Standard Time</option>
                <option value="CST">Central Standard Time</option>
              </Input>
            </FormGroup>
            <Button color="primary" onClick={handleSave}>Save Changes</Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminFullSettingsPage;