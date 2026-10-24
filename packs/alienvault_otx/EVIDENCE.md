# AlienVault OTX — batch=A

The official [API entry point](https://otx.alienvault.com/api) was inspected, including its public documentation UI assets. The page links vendor SDKs, but the lookup endpoint request/response definitions were not publicly retrievable in this review. SDK implementation code and XSOAR source are not endpoint evidence.

IP, IPv6, domain, URL and hash lookup commands are reported in unsupported.json with no executable pack or fixtures. Authentication is not the blocker: the existing API-key-header plugin can represent the known API-key form. Verified official endpoint definitions are needed before these operations can be admitted.
