# Changelog

## 0.9.0 (2026-04-23)

Full Changelog: [v0.8.0...v0.9.0](https://github.com/keycardai/keycard-ts/compare/v0.8.0...v0.9.0)

### Features

* add filter/query to policy (set) queries (ACC-147) ([150e40b](https://github.com/keycardai/keycard-ts/commit/150e40b670337a55b5188145dc7ee1c369ffeeca))
* add standard pagination/filter/search definitions ([746f849](https://github.com/keycardai/keycard-ts/commit/746f849e1031e0ff56017fec2f2eeb9f216a5337))
* resource prefix flag ([f0e1275](https://github.com/keycardai/keycard-ts/commit/f0e1275b97adcc49084bd03b1fd9b391c82b5219))


### Bug Fixes

* **deps:** upgrade dependancies for vulnerabilties found by socket ([#13](https://github.com/keycardai/keycard-ts/issues/13)) ([b7e85cc](https://github.com/keycardai/keycard-ts/commit/b7e85cc43ba28a827508aff225c59dfdff5c8751))


### Chores

* **internal:** more robust bootstrap script ([37402aa](https://github.com/keycardai/keycard-ts/commit/37402aab5bcce1af2b9c1a516ba07131724fd2df))

## 0.8.0 (2026-04-09)

Full Changelog: [v0.7.1...v0.8.0](https://github.com/keycardai/keycard-ts/compare/v0.7.1...v0.8.0)

### Features

* add openapi-yaml command ([d9b8b14](https://github.com/keycardai/keycard-ts/commit/d9b8b14815c7f56572e117784003f572b0dd621c))
* Draft Lenient Schema Validation with Warnings (ACC-66) ([9defbd8](https://github.com/keycardai/keycard-ts/commit/9defbd85cec830374f2362bf9bcfcf2ae32448b9))
* improved identities pagination ([126f94e](https://github.com/keycardai/keycard-ts/commit/126f94e5759c63f586074fd866de7783d8cc2f83))
* normalize and validate user input (ACC-107) ([42691f7](https://github.com/keycardai/keycard-ts/commit/42691f707fe12b2fd33720eac3c158ea420a3c30))
* shadow testing (ACC-14) ([b0f8563](https://github.com/keycardai/keycard-ts/commit/b0f85636c7a6635da8229c592504a213ee7dca43))


### Chores

* **internal:** codegen related update ([1112c61](https://github.com/keycardai/keycard-ts/commit/1112c6132cf7a60bd6e4270c15d3fec97cca2f9a))

## 0.7.1 (2026-04-02)

Full Changelog: [v0.7.0...v0.7.1](https://github.com/keycardai/keycard-ts/compare/v0.7.0...v0.7.1)

### Chores

* update SDK settings ([f865298](https://github.com/keycardai/keycard-ts/commit/f865298278cfae6034831ee5df36ea4f4c6a68ec))
* update SDK settings ([3689395](https://github.com/keycardai/keycard-ts/commit/3689395e288c8a1fc7c7c7a8bbf22cacef8cc631))
* update SDK settings ([9592071](https://github.com/keycardai/keycard-ts/commit/95920717b0837de7d558c10ed9900d0f2ba2a18d))

## 0.7.0 (2026-04-01)

Full Changelog: [v0.6.0...v0.7.0](https://github.com/keycardai/keycard-ts/compare/v0.6.0...v0.7.0)

### Features

* add email search to list organization identities endpoint ([6cfdbe6](https://github.com/keycardai/keycard-ts/commit/6cfdbe68c087501ee80246f11fa826b8f388deb8))
* add owner_type and enforce protection for platform-owned versions (ACC-29) ([15072d6](https://github.com/keycardai/keycard-ts/commit/15072d6973c4b05015f5b1ab65adaf49878122ee))
* add PRM discovery to MCP gateway endpoint ([b7607db](https://github.com/keycardai/keycard-ts/commit/b7607dbacfdfd99e96f58364e8e12ed327617628))
* draft policy sets ([0afd777](https://github.com/keycardai/keycard-ts/commit/0afd777a3808a0f9b45a6def931aeff98fd33645))
* provide more context for policy schema ([50bb2cf](https://github.com/keycardai/keycard-ts/commit/50bb2cf3f386da8030d76acd620e7e0c5a262db5))
* Support for user identifier and provider user identifier claim ([6d679b9](https://github.com/keycardai/keycard-ts/commit/6d679b9a98838d15f1a7d5b79053436f0e24e32e))
* support raw cedar ([c01c0d6](https://github.com/keycardai/keycard-ts/commit/c01c0d60e870965d83a6584d3d759a3ad07fe7b0))
* use common bearerAuth and OAuth2 security schemes ([7420a7e](https://github.com/keycardai/keycard-ts/commit/7420a7e103f81562ee97afb05433925690262fdd))


### Chores

* **ci:** skip lint on metadata-only changes ([3a7dc8d](https://github.com/keycardai/keycard-ts/commit/3a7dc8d9241cc533582b126cfbbcf9bd5f27fffc))
* configure new SDK language ([8071a68](https://github.com/keycardai/keycard-ts/commit/8071a688f6130ccd6e471ec9406b1b5e92303443))
* **internal:** support x-stainless-mcp-client-permissions headers in MCP servers ([2d1a742](https://github.com/keycardai/keycard-ts/commit/2d1a742617b1f55e576b82eb8ce0f65471fca6c6))
* **internal:** tweak CI branches ([b385a90](https://github.com/keycardai/keycard-ts/commit/b385a90b711b399770f347c0b245a26410e10d2d))
* **internal:** update gitignore ([e3bd6d4](https://github.com/keycardai/keycard-ts/commit/e3bd6d4aa5367ffad3222d8c4934e7a362d42748))

## 0.6.0 (2026-03-16)

Full Changelog: [v0.5.1...v0.6.0](https://github.com/keycardai/keycard-ts/compare/v0.5.1...v0.6.0)

### Features

* add OAuth2 as alternative auth on management API endpoints ([c2c973b](https://github.com/keycardai/keycard-ts/commit/c2c973b1aee8ea129ecf657cf80665809931865c))
* add OAuth2 client credentials security scheme from common spec ([28caaba](https://github.com/keycardai/keycard-ts/commit/28caaba8ed5acb25aed81273a3913f432994f221))
* add OAuth2 client_credentials auth to SDK config ([6d93dfb](https://github.com/keycardai/keycard-ts/commit/6d93dfb7dfb2eefe1bddf0e644b6e36c479fa1bb))
* consolidate prefixed security schemes into canonical names ([9a52ec6](https://github.com/keycardai/keycard-ts/commit/9a52ec61a4068c5536f8ff7ad6947ec2d6b7bac6))
* Include `array_format: brackets` settings ([7a0d42f](https://github.com/keycardai/keycard-ts/commit/7a0d42faee627735525ef3e2ca8f40a7cabc77e3))
* remove unused security schemes from joined spec ([99b0a72](https://github.com/keycardai/keycard-ts/commit/99b0a72a6e062dde86ddea1d03b85b1334ad30c3))
* support HTTP Basic Auth for service account token endpoint (RFC 6749 2.3.1) ([8d67678](https://github.com/keycardai/keycard-ts/commit/8d6767836bfe99808d2f2c450995a93eb7973dc8))
* update pkg-oapi-common and add OAuth2 security scheme ([8449686](https://github.com/keycardai/keycard-ts/commit/8449686490cde9285e555bcdd2309f1ae24423c1))


### Bug Fixes

* **tests:** correct setup of OAuth 2 Client Credentials tests ([1b9a2b8](https://github.com/keycardai/keycard-ts/commit/1b9a2b879bed3d905cdfe9d63c118b5abb62cf58))


### Chores

* hide unstable mcp features from api documentation ([f22bdfc](https://github.com/keycardai/keycard-ts/commit/f22bdfc3282ff99da9154e4ff21ca4a2b96ff7ea))


### Documentation

* remove MCP endpoints ([30f3426](https://github.com/keycardai/keycard-ts/commit/30f34267c8cbd16febaef1cccc8108c2740d0fa4))

## 0.5.1 (2026-03-10)

Full Changelog: [v0.5.0...v0.5.1](https://github.com/keycardai/keycard-ts/compare/v0.5.0...v0.5.1)

### Chores

* update SDK settings ([aa1913e](https://github.com/keycardai/keycard-ts/commit/aa1913ed0280b3b6a63a077968c07a2594ca1af7))

## 0.5.0 (2026-03-10)

Full Changelog: [v0.4.0...v0.5.0](https://github.com/keycardai/keycard-ts/compare/v0.4.0...v0.5.0)

### Features

* Correct TS package name ([1ed62b0](https://github.com/keycardai/keycard-ts/commit/1ed62b09476d3b90cf265dffb972b5517133effd))

## 0.4.0 (2026-03-10)

Full Changelog: [v0.3.0...v0.4.0](https://github.com/keycardai/keycard-ts/compare/v0.3.0...v0.4.0)

### Features

* Typescript package name @keycardai/api ([99293f2](https://github.com/keycardai/keycard-ts/commit/99293f272a4f6beaea644218cf1de94bd358dca5))

## 0.3.0 (2026-03-10)

Full Changelog: [v0.2.0...v0.3.0](https://github.com/keycardai/keycard-ts/compare/v0.2.0...v0.3.0)

### Features

* jelmer/stainless keycardai configuration ([22ecb83](https://github.com/keycardai/keycard-ts/commit/22ecb833f684818a9a85a306b12ce0ccdfa56c70))


### Chores

* sync repo ([940643a](https://github.com/keycardai/keycard-ts/commit/940643a8445a3a0a8366d6d9aada48e05eb1b43f))

## 0.2.0 (2026-03-09)

Full Changelog: [v0.1.0...v0.2.0](https://github.com/keycardlabs/keycard-ts/compare/v0.1.0...v0.2.0)

### Features

* configure SDK packages ([57344fc](https://github.com/keycardlabs/keycard-ts/commit/57344fc927bde3f1a6564bb92baeaae62a498476))

## 0.1.0 (2026-03-07)

Full Changelog: [v0.0.1...v0.1.0](https://github.com/keycardlabs/keycard-ts/compare/v0.0.1...v0.1.0)

### Features

* Add application_type property to url credential ([16040e6](https://github.com/keycardlabs/keycard-ts/commit/16040e668ddb3bd76e920fab2bdd180092ae805c))
* add is_system_managed property to resources and applications ([4be8496](https://github.com/keycardlabs/keycard-ts/commit/4be849688f538eea5cc8632ae5263b75c800c85f))
* filter, search, sort for invitations (COR-577) ([4a072d6](https://github.com/keycardlabs/keycard-ts/commit/4a072d68763f557cc86c42231c3c85fea61b5765))
* internal endpoint to re-send verification email ([08a5baf](https://github.com/keycardlabs/keycard-ts/commit/08a5baf575e0ece5a3e4d91d6ce1e1713bf9a9c6))
* PREVIEW: sync svc-iam.yaml from svc-iam/jelmer/updated-openapi-sync-workflow ([b73ba49](https://github.com/keycardlabs/keycard-ts/commit/b73ba49c830fb0545a755596c6e5e80b1baccd28))
* PREVIEW: sync svc-vault-api.yaml from svc-vault-api/jelmer/cor-298-add-openapi-sync ([d705ffd](https://github.com/keycardlabs/keycard-ts/commit/d705ffdd6989e7fd6a4a93b9f1ac8e332544d64d))
* switch zone setting for email/password support (COR-543) ([c162c5f](https://github.com/keycardlabs/keycard-ts/commit/c162c5fea206d057166e75e21e1f2bc6c6c4c35c))


### Bug Fixes

* **client:** avoid removing abort listener too early ([8da0476](https://github.com/keycardlabs/keycard-ts/commit/8da04761ebc69b15dbf8f8db0f981c9008d71cfb))
* **client:** improve parameter names ([f33562b](https://github.com/keycardlabs/keycard-ts/commit/f33562bfd43e2f82979cb931dca4d5d716134251))
* **client:** preserve URL params already embedded in path ([3b4dac8](https://github.com/keycardlabs/keycard-ts/commit/3b4dac89d3f106c11f1781546ccf186526af3a10))
* fix request delays for retrying to be more respectful of high requested delays ([38321c4](https://github.com/keycardlabs/keycard-ts/commit/38321c40018634fef21f4590790b25fd8d88afd7))
* remove refs to internal components when stripping x-internal ([4db0911](https://github.com/keycardlabs/keycard-ts/commit/4db09115cfb9eb0b0e4840684977f6b1f4c5a616))


### Chores

* **ci:** skip uploading artifacts on stainless-internal branches ([214da9c](https://github.com/keycardlabs/keycard-ts/commit/214da9c6f8ba2879c40a507eb93fdf510734545e))
* **client:** restructure abort controller binding ([0ad19b6](https://github.com/keycardlabs/keycard-ts/commit/0ad19b61b780d0fa52a4e6c9f38706b1f59bc500))
* configure new SDK language ([86f7819](https://github.com/keycardlabs/keycard-ts/commit/86f7819ff9c02bb90ff3d33ee1b357751325e6b5))
* **internal:** avoid type checking errors with ts-reset ([994871a](https://github.com/keycardlabs/keycard-ts/commit/994871a539f93ec6c7231845b7a40759e352c2f9))
* **internal:** move stringifyQuery implementation to internal function ([8d747ba](https://github.com/keycardlabs/keycard-ts/commit/8d747ba3b48e6d57632e705be50690af2d541a50))
* **internal:** upgrade pnpm ([a3a09bc](https://github.com/keycardlabs/keycard-ts/commit/a3a09bc803263a502a1d46394e22878cd47596dc))
* sync repo ([61d1cc5](https://github.com/keycardlabs/keycard-ts/commit/61d1cc51ec7f3d393ce9d2fb71848484f96ed0ee))
* update SDK settings ([fa7ea12](https://github.com/keycardlabs/keycard-ts/commit/fa7ea1233615b2f8224036be82ec2aaaf36cacbe))
