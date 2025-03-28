# AI-DOJO Project Instructions

### Build
To build the application, run the following command:  
`ng build`

### Development Server
Start the development server by running:  
`ng serve`  
Navigate to [http://localhost:4200/] in your browser. The application will automatically reload when you make changes to the source files.

### Docker
1. **First-Time Setup or After Changes**:  
   If this is your first time starting the application or if you've made changes to the app, use:  
   `docker-compose up --build -d`

2. **Starting Without Changes**:  
   If no changes have been made and the build was successful, simply run:  
   `docker-compose up -d`

3. **Shutting Down the Application**:  
   To turn off the application, run:  
   `docker-compose down`

### Kibana, Cryton, and Agents
To correctly load **Kibana**, **Cryton**, or **Textual Agents**, ensure the port configuration in their respective HTML files is accurate:

1. Navigate to the HTML file for the desired component (`cryton`, `textual-agents`, or `kibana`).
2. Update the `src` attribute in the iframe tag:  
   Replace `XXXX` in:  
   ```
   src="http://localhost:XXXX"
   ```
   with the appropriate port number where the corresponding service is running.
