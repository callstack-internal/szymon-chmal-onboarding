import {SetupServerApi} from 'msw/node';
import {http, HttpResponse, JsonBodyType} from 'msw';

export type OverrideNetworkResponseOptions = {
  server: SetupServerApi;
  url: string;
  data: JsonBodyType;
  status: number;
  once?: boolean;
};

export const overrideNetworkResponse = ({
  server,
  url,
  data,
  status,
  once = false,
}: OverrideNetworkResponseOptions): void => {
  server.use(
    http.get(
      url,
      () => {
        return HttpResponse.json(data, {status});
      },
      {once},
    ),
  );
};
