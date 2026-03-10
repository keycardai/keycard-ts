# Changelog

## 0.3.1 (2026-03-10)

Full Changelog: [v0.3.0...v0.3.1](https://github.com/keycardai/keycard-ts/compare/v0.3.0...v0.3.1)

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
