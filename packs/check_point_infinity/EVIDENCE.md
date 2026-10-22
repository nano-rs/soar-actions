# Check Point Infinity IoC Management API references

Requires a current CloudInfra bearer JWT with authority on the account and existing manual feed. Configure the feed in the Quantum gateway prevention policy before using indicators. Adds enable an indicator with a one-day TTL; deletion removes only that indicator. Other feeds and policies may continue blocking. Re-adding does not restore historical TTL/name/description metadata. The API reference specifies 50 requests/minute for some writes; 403 can indicate a quota or permission failure. Only the configured global origin is supported.

## Add ipv4 indicator

Change one indicator in an existing manual IoC feed. New indicators are enabled with a one-day TTL. Gateway prevention depends on the feed being configured in Quantum policy; this acknowledgment does not prove packet blocking. Delete removes this indicator, not independent protections from other feeds. API documentation: https://app.swaggerhub.com/apis-docs/Check-Point/Custom-IOC-Management-API/1.0.3#/Feed%20Indicator%20Controller/addIndicatorToFeed

`POST https://cloudinfra-gw.portal.checkpoint.com/app/ioc-management/feeds/{{input.feed_id}}/indicators`

Inverse action: `delete_ipv4_indicator`.

## Delete ipv4 indicator

Change one indicator in an existing manual IoC feed. Gateway prevention depends on the feed being configured in Quantum policy; this acknowledgment does not prove packet blocking. Delete removes this indicator, not independent protections from other feeds. API documentation: https://app.swaggerhub.com/apis-docs/Check-Point/Custom-IOC-Management-API/1.0.3#/Feed%20Indicator%20Controller/deleteIndicatorFromFeed

`DELETE https://cloudinfra-gw.portal.checkpoint.com/app/ioc-management/feeds/{{input.feed_id}}/indicators/ipv4/{{input.indicator}}`

Inverse action: `add_ipv4_indicator`.

## Add domain indicator

Change one indicator in an existing manual IoC feed. New indicators are enabled with a one-day TTL. Gateway prevention depends on the feed being configured in Quantum policy; this acknowledgment does not prove packet blocking. Delete removes this indicator, not independent protections from other feeds. API documentation: https://app.swaggerhub.com/apis-docs/Check-Point/Custom-IOC-Management-API/1.0.3#/Feed%20Indicator%20Controller/addIndicatorToFeed

`POST https://cloudinfra-gw.portal.checkpoint.com/app/ioc-management/feeds/{{input.feed_id}}/indicators`

Inverse action: `delete_domain_indicator`.

## Delete domain indicator

Change one indicator in an existing manual IoC feed. Gateway prevention depends on the feed being configured in Quantum policy; this acknowledgment does not prove packet blocking. Delete removes this indicator, not independent protections from other feeds. API documentation: https://app.swaggerhub.com/apis-docs/Check-Point/Custom-IOC-Management-API/1.0.3#/Feed%20Indicator%20Controller/deleteIndicatorFromFeed

`DELETE https://cloudinfra-gw.portal.checkpoint.com/app/ioc-management/feeds/{{input.feed_id}}/indicators/domain/{{input.indicator}}`

Inverse action: `add_domain_indicator`.

## Hosts and request budgets

Host: `cloudinfra-gw.portal.checkpoint.com`. Paths: `/app/ioc-management/feeds`.

Local request budgets: 10/minute and 500/day; timeout 20 seconds. Vendor quotas are shared and may impose lower limits. Rate-limit responses stop the action. Mutations require approval and are not retried automatically after an uncertain response.

## Unsupported operations

- `on_prem_block_ip`: Customer-managed appliance or instance hosts require an on-premises relay and are unsupported. References: https://sc1.checkpoint.com/documents/latest/APIs/.
- `on_prem_unblock_ip`: Customer-managed appliance or instance hosts require an on-premises relay and are unsupported. References: https://sc1.checkpoint.com/documents/latest/APIs/.
