import { rest } from 'msw';
import { StatusCode } from 'state/statusCode';
import { v4 as uuidv4 } from 'uuid';

export const userHandlers = [
  rest.post('*/users', async (req, res, ctx) => {
    const { username, age, country, gender, containsEmails, dynamicFields } = await req.json();
    const data = JSON.stringify({
      username,
      age,
      country,
      gender,
      containsEmails,
      dynamicFields
    });
    console.log(`MOCK USERS HANDLER, data has been received: ${data}`);
    const response = {
      operationResult: uuidv4(),
      statusCode: StatusCode.created,
      message: 'User has been created'
    };
    return res(ctx.status(201), ctx.json(response));
  })
];
