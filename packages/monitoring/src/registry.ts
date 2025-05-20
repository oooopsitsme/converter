import { Counter, Histogram, Registry, collectDefaultMetrics as collectDefaultMetricsProm } from 'prom-client';

import { singleton } from './utils/singleton';

interface RegisterRequestProps {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  route: string;
  statusCode?: number;
}

interface SeoSpamProps {}

interface RequestDurationProps {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  route: string;
  success: boolean;
}

interface EventHandlerProps {
  success: boolean;
}

interface GraphQLProxyProps {
  operation: string;
  success: boolean;
}

interface RedisCacheMetricsProps {
  success: boolean;
  action: 'get' | 'set';
}
interface RedisCacheDurationProps {
  success: boolean;
  action: 'get' | 'set';
}

const registry = singleton('prometheus#Registry', () => new Registry());
const getRegistryInstance = () => registry;

const requestsMetric = singleton(
  'prometheus#requestsMetric',
  () =>
    new Counter<keyof RegisterRequestProps>({
      name: 'web_app_requests',
      help: 'Count of status code per url per method',
      labelNames: ['method', 'route', 'statusCode'],
      aggregator: 'sum',
      registers: [registry],
    }),
);
const seoSpamMetric = singleton(
  'prometheus#seoSpamMetric',
  () =>
    new Counter<keyof SeoSpamProps>({
      name: 'seo_spam_requests',
      help: 'Count of requests with seo spam in url',
      labelNames: [],
      aggregator: 'sum',
      registers: [registry],
    }),
);

const requestDurationMetric = singleton(
  'prometheus#requestDurationMetric',
  () =>
    new Histogram<keyof RequestDurationProps>({
      name: 'web_app_requests_duration',
      help: 'Total duration of a request',
      labelNames: ['method', 'route', 'success'],
      registers: [registry],
    }),
);

const eventHandlerMetric = singleton(
  'prometheus#eventHandlerMetric',
  () =>
    new Counter<keyof EventHandlerProps>({
      name: 'event_handler',
      help: 'Count of event handlers',
      labelNames: ['success'],
      aggregator: 'sum',
      registers: [registry],
    }),
);

const grapgqlProxyMetric = singleton(
  'prometheus#grapgqlProxyMetric',
  () =>
    new Counter<keyof GraphQLProxyProps>({
      name: 'graphql_proxy',
      help: 'Count of GraphQL Proxy',
      labelNames: ['success', 'operation'],
      aggregator: 'sum',
      registers: [registry],
    }),
);

const redisCacheProxyMetric = singleton(
  'prometheus#redisCacheProxyMetric',
  () =>
    new Counter<keyof RedisCacheMetricsProps>({
      name: 'redis_cache',
      help: 'Redis cache hits',
      labelNames: ['success', 'action'],
      aggregator: 'sum',
      registers: [registry],
    }),
);

const redisCacheDurationMetric = singleton(
  'prometheus#redisCacheDurationMetric',
  () =>
    new Histogram<keyof RedisCacheDurationProps>({
      name: 'redis_cache_duration',
      help: 'Total duration of a redis cache retrieval',
      labelNames: ['success', 'action'],
      registers: [registry],
    }),
);

singleton('prometheus#DefaultMetrics', () => {
  collectDefaultMetricsProm({ register: registry });
  return true;
});

const registerRequest = ({ method = 'GET', statusCode = 200, route }: RegisterRequestProps, enabled = true) => {
  if (!enabled) return;
  requestsMetric?.inc({ method, route, statusCode: statusCode.toString() });
};
const registerSeoSpam = (enabled = true) => {
  if (!enabled) return;
  seoSpamMetric?.inc();
};
const registerRequestDuration = ({ method = 'GET', route }: Omit<RequestDurationProps, 'success'>, enabled = true) => {
  if (!enabled) return;
  const endTimer = requestDurationMetric?.startTimer({ method, route });
  return (success = true) => endTimer?.({ success: success ? 'true' : 'false' });
};
const registerEventHandlerCallback = ({ success }: EventHandlerProps, enabled = true) => {
  if (!enabled) return;
  eventHandlerMetric?.inc({ success: success ? 'true' : 'false' });
};
const registerGraphQLProxy = ({ success, operation }: GraphQLProxyProps, enabled = true) => {
  if (!enabled) return;
  grapgqlProxyMetric?.inc({ success: success ? 'true' : 'false', operation });
};
const registerRedisCacheHit = ({ success, action }: RedisCacheMetricsProps, enabled = true) => {
  if (!enabled) return;
  redisCacheProxyMetric?.inc({ success: success ? 'true' : 'false', action });
};
const registerRedisCacheDuration = ({ action }: Omit<RedisCacheMetricsProps, 'success'>, enabled = true) => {
  if (!enabled) return;
  const endTimer = redisCacheDurationMetric?.startTimer({ action });
  return (success = true) => endTimer?.({ success: success ? 'true' : 'false' });
};

export type { Registry, RegisterRequestProps, SeoSpamProps, RequestDurationProps };
export {
  getRegistryInstance,
  registerSeoSpam,
  registerRequest,
  registerRequestDuration,
  registerEventHandlerCallback,
  registerGraphQLProxy,
  registerRedisCacheHit,
  registerRedisCacheDuration,
};
