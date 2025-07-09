To view the list of recently executed pipelines, you can follow these steps:

1. **Access Pipeline Homepage**:

   - Log in to your cloud service platform, such as Huawei Cloud's CodeArts Pipeline homepage.

2. **View Pipeline List**:

   - On the pipeline list page, you can display all pipelines under the current user. The list will show pipeline names, latest execution information, workflow status, start time, and execution duration, etc.

3. **Filter and Search**:

   - You can use the dropdown to filter by "All Pipelines", "Created by Me", and "Last Record Executed by Me".
   - Support searching by entering pipeline name keywords in the search bar.

4. **View Execution History**:

   - Click on the pipeline name to enter the pipeline's "Execution History" page, displaying the pipeline's execution records. You can use the time filter to select time periods for filtering, supporting viewing execution records from the last 90 days, with the default showing the last 31 days of execution records.

5. **View Pipeline Details**:

   - Click on the execution number to enter the "Pipeline Details" page and view the details of the corresponding execution record.

6. **Query Using API**:

   - If you need to get the latest pipeline run status through API, you can use the following interface: `GET /v2/pipelines/{pipeline_id}/status`, where `pipeline_id` is the pipeline ID. This interface returns information such as pipeline execution status, execution results, executor, start time, and end time.

7. **Get Pipeline List and Execution Status**:
   - You can also use POST request `/v5/{project_id}/api/pipelines/list` to get the pipeline list and execution status of pipelines under the project.

Through the above steps, you can effectively view and manage the list of recently executed pipelines and their detailed information.