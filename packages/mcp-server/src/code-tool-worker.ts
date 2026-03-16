// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import path from 'node:path';
import util from 'node:util';
import Fuse from 'fuse.js';
import ts from 'typescript';
import { WorkerOutput } from './code-tool-types';
import { KeycardAPI, ClientOptions } from '@keycardai/api';

function getRunFunctionSource(code: string): {
  type: 'declaration' | 'expression';
  client: string | undefined;
  code: string;
} | null {
  const sourceFile = ts.createSourceFile('code.ts', code, ts.ScriptTarget.Latest, true);
  const printer = ts.createPrinter();

  for (const statement of sourceFile.statements) {
    // Check for top-level function declarations
    if (ts.isFunctionDeclaration(statement)) {
      if (statement.name?.text === 'run') {
        return {
          type: 'declaration',
          client: statement.parameters[0]?.name.getText(),
          code: printer.printNode(ts.EmitHint.Unspecified, statement.body!, sourceFile),
        };
      }
    }

    // Check for variable declarations: const run = () => {} or const run = function() {}
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (
          ts.isIdentifier(declaration.name) &&
          declaration.name.text === 'run' &&
          // Check if it's initialized with a function
          declaration.initializer &&
          (ts.isFunctionExpression(declaration.initializer) || ts.isArrowFunction(declaration.initializer))
        ) {
          return {
            type: 'expression',
            client: declaration.initializer.parameters[0]?.name.getText(),
            code: printer.printNode(ts.EmitHint.Unspecified, declaration.initializer, sourceFile),
          };
        }
      }
    }
  }

  return null;
}

function getTSDiagnostics(code: string): string[] {
  const functionSource = getRunFunctionSource(code)!;
  const codeWithImport = [
    'import { KeycardAPI } from "@keycardai/api";',
    functionSource.type === 'declaration' ?
      `async function run(${functionSource.client}: KeycardAPI)`
    : `const run: (${functionSource.client}: KeycardAPI) => Promise<unknown> =`,
    functionSource.code,
  ].join('\n');
  const sourcePath = path.resolve('code.ts');
  const ast = ts.createSourceFile(sourcePath, codeWithImport, ts.ScriptTarget.Latest, true);
  const options = ts.getDefaultCompilerOptions();
  options.target = ts.ScriptTarget.Latest;
  options.module = ts.ModuleKind.NodeNext;
  options.moduleResolution = ts.ModuleResolutionKind.NodeNext;
  const host = ts.createCompilerHost(options, true);
  const newHost: typeof host = {
    ...host,
    getSourceFile: (...args) => {
      if (path.resolve(args[0]) === sourcePath) {
        return ast;
      }
      return host.getSourceFile(...args);
    },
    readFile: (...args) => {
      if (path.resolve(args[0]) === sourcePath) {
        return codeWithImport;
      }
      return host.readFile(...args);
    },
    fileExists: (...args) => {
      if (path.resolve(args[0]) === sourcePath) {
        return true;
      }
      return host.fileExists(...args);
    },
  };
  const program = ts.createProgram({
    options,
    rootNames: [sourcePath],
    host: newHost,
  });
  const diagnostics = ts.getPreEmitDiagnostics(program, ast);
  return diagnostics.map((d) => {
    const message = ts.flattenDiagnosticMessageText(d.messageText, '\n');
    if (!d.file || !d.start) return `- ${message}`;
    const { line: lineNumber } = ts.getLineAndCharacterOfPosition(d.file, d.start);
    const line = codeWithImport.split('\n').at(lineNumber)?.trim();
    return line ? `- ${message}\n    ${line}` : `- ${message}`;
  });
}

const fuse = new Fuse(
  [
    'client.zones.create',
    'client.zones.delete',
    'client.zones.list',
    'client.zones.listSessionResourceAccess',
    'client.zones.retrieve',
    'client.zones.update',
    'client.zones.applications.create',
    'client.zones.applications.delete',
    'client.zones.applications.list',
    'client.zones.applications.listCredentials',
    'client.zones.applications.listResources',
    'client.zones.applications.retrieve',
    'client.zones.applications.update',
    'client.zones.applications.dependencies.add',
    'client.zones.applications.dependencies.list',
    'client.zones.applications.dependencies.remove',
    'client.zones.applications.dependencies.retrieve',
    'client.zones.applicationCredentials.create',
    'client.zones.applicationCredentials.delete',
    'client.zones.applicationCredentials.list',
    'client.zones.applicationCredentials.retrieve',
    'client.zones.applicationCredentials.update',
    'client.zones.delegatedGrants.delete',
    'client.zones.delegatedGrants.list',
    'client.zones.delegatedGrants.retrieve',
    'client.zones.delegatedGrants.update',
    'client.zones.providers.create',
    'client.zones.providers.delete',
    'client.zones.providers.list',
    'client.zones.providers.retrieve',
    'client.zones.providers.update',
    'client.zones.resources.create',
    'client.zones.resources.delete',
    'client.zones.resources.list',
    'client.zones.resources.retrieve',
    'client.zones.resources.update',
    'client.zones.sessions.delete',
    'client.zones.sessions.list',
    'client.zones.sessions.retrieve',
    'client.zones.sessions.update',
    'client.zones.userAgents.list',
    'client.zones.userAgents.retrieve',
    'client.zones.users.list',
    'client.zones.users.retrieve',
    'client.zones.members.add',
    'client.zones.members.delete',
    'client.zones.members.list',
    'client.zones.members.retrieve',
    'client.zones.members.update',
    'client.zones.secrets.create',
    'client.zones.secrets.delete',
    'client.zones.secrets.list',
    'client.zones.secrets.retrieve',
    'client.zones.secrets.update',
    'client.zones.policySchemas.list',
    'client.zones.policySchemas.retrieve',
    'client.zones.policySchemas.setDefault',
    'client.zones.policies.archive',
    'client.zones.policies.create',
    'client.zones.policies.list',
    'client.zones.policies.retrieve',
    'client.zones.policies.update',
    'client.zones.policies.versions.archive',
    'client.zones.policies.versions.create',
    'client.zones.policies.versions.list',
    'client.zones.policies.versions.retrieve',
    'client.zones.policySets.archive',
    'client.zones.policySets.create',
    'client.zones.policySets.list',
    'client.zones.policySets.retrieve',
    'client.zones.policySets.update',
    'client.zones.policySets.versions.archive',
    'client.zones.policySets.versions.create',
    'client.zones.policySets.versions.list',
    'client.zones.policySets.versions.listPolicies',
    'client.zones.policySets.versions.retrieve',
    'client.zones.policySets.versions.update',
    'client.organizations.create',
    'client.organizations.exchangeToken',
    'client.organizations.list',
    'client.organizations.listIdentities',
    'client.organizations.listRoles',
    'client.organizations.retrieve',
    'client.organizations.update',
    'client.organizations.users.delete',
    'client.organizations.users.list',
    'client.organizations.users.retrieve',
    'client.organizations.users.update',
    'client.organizations.invitations.create',
    'client.organizations.invitations.delete',
    'client.organizations.invitations.list',
    'client.organizations.serviceAccounts.create',
    'client.organizations.serviceAccounts.delete',
    'client.organizations.serviceAccounts.list',
    'client.organizations.serviceAccounts.retrieve',
    'client.organizations.serviceAccounts.update',
    'client.organizations.serviceAccounts.credentials.create',
    'client.organizations.serviceAccounts.credentials.delete',
    'client.organizations.serviceAccounts.credentials.list',
    'client.organizations.serviceAccounts.credentials.retrieve',
    'client.organizations.serviceAccounts.credentials.update',
    'client.organizations.ssoConnection.disable',
    'client.organizations.ssoConnection.enable',
    'client.organizations.ssoConnection.retrieve',
    'client.organizations.ssoConnection.update',
    'client.invitations.accept',
    'client.invitations.retrieve',
  ],
  { threshold: 1, shouldSort: true },
);

function getMethodSuggestions(fullyQualifiedMethodName: string): string[] {
  return fuse
    .search(fullyQualifiedMethodName)
    .map(({ item }) => item)
    .slice(0, 5);
}

const proxyToObj = new WeakMap<any, any>();
const objToProxy = new WeakMap<any, any>();

type ClientProxyConfig = {
  path: string[];
  isBelievedBad?: boolean;
};

function makeSdkProxy<T extends object>(obj: T, { path, isBelievedBad = false }: ClientProxyConfig): T {
  let proxy: T = objToProxy.get(obj);

  if (!proxy) {
    proxy = new Proxy(obj, {
      get(target, prop, receiver) {
        const propPath = [...path, String(prop)];
        const value = Reflect.get(target, prop, receiver);

        if (isBelievedBad || (!(prop in target) && value === undefined)) {
          // If we're accessing a path that doesn't exist, it will probably eventually error.
          // Let's proxy it and mark it bad so that we can control the error message.
          // We proxy an empty class so that an invocation or construction attempt is possible.
          return makeSdkProxy(class {}, { path: propPath, isBelievedBad: true });
        }

        if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
          return makeSdkProxy(value, { path: propPath, isBelievedBad });
        }

        return value;
      },

      apply(target, thisArg, args) {
        if (isBelievedBad || typeof target !== 'function') {
          const fullyQualifiedMethodName = path.join('.');
          const suggestions = getMethodSuggestions(fullyQualifiedMethodName);
          throw new Error(
            `${fullyQualifiedMethodName} is not a function. Did you mean: ${suggestions.join(', ')}`,
          );
        }

        return Reflect.apply(target, proxyToObj.get(thisArg) ?? thisArg, args);
      },

      construct(target, args, newTarget) {
        if (isBelievedBad || typeof target !== 'function') {
          const fullyQualifiedMethodName = path.join('.');
          const suggestions = getMethodSuggestions(fullyQualifiedMethodName);
          throw new Error(
            `${fullyQualifiedMethodName} is not a constructor. Did you mean: ${suggestions.join(', ')}`,
          );
        }

        return Reflect.construct(target, args, newTarget);
      },
    });

    objToProxy.set(obj, proxy);
    proxyToObj.set(proxy, obj);
  }

  return proxy;
}

function parseError(code: string, error: unknown): string | undefined {
  if (!(error instanceof Error)) return;
  const message = error.name ? `${error.name}: ${error.message}` : error.message;
  try {
    // Deno uses V8; the first "<anonymous>:LINE:COLUMN" is the top of stack.
    const lineNumber = error.stack?.match(/<anonymous>:([0-9]+):[0-9]+/)?.[1];
    // -1 for the zero-based indexing
    const line =
      lineNumber &&
      code
        .split('\n')
        .at(parseInt(lineNumber, 10) - 1)
        ?.trim();
    return line ? `${message}\n  at line ${lineNumber}\n    ${line}` : message;
  } catch {
    return message;
  }
}

const fetch = async (req: Request): Promise<Response> => {
  const { opts, code } = (await req.json()) as { opts: ClientOptions; code: string };

  const runFunctionSource = code ? getRunFunctionSource(code) : null;
  if (!runFunctionSource) {
    const message =
      code ?
        'The code is missing a top-level `run` function.'
      : 'The code argument is missing. Provide one containing a top-level `run` function.';
    return Response.json(
      {
        is_error: true,
        result: `${message} Write code within this template:\n\n\`\`\`\nasync function run(client) {\n  // Fill this out\n}\n\`\`\``,
        log_lines: [],
        err_lines: [],
      } satisfies WorkerOutput,
      { status: 400, statusText: 'Code execution error' },
    );
  }

  const diagnostics = getTSDiagnostics(code);
  if (diagnostics.length > 0) {
    return Response.json(
      {
        is_error: true,
        result: `The code contains TypeScript diagnostics:\n${diagnostics.join('\n')}`,
        log_lines: [],
        err_lines: [],
      } satisfies WorkerOutput,
      { status: 400, statusText: 'Code execution error' },
    );
  }

  const client = new KeycardAPI({
    ...opts,
  });

  const log_lines: string[] = [];
  const err_lines: string[] = [];
  const console = {
    log: (...args: unknown[]) => {
      log_lines.push(util.format(...args));
    },
    error: (...args: unknown[]) => {
      err_lines.push(util.format(...args));
    },
  };
  try {
    let run_ = async (client: any) => {};
    eval(`${code}\nrun_ = run;`);
    const result = await run_(makeSdkProxy(client, { path: ['client'] }));
    return Response.json({
      is_error: false,
      result,
      log_lines,
      err_lines,
    } satisfies WorkerOutput);
  } catch (e) {
    return Response.json(
      {
        is_error: true,
        result: parseError(code, e),
        log_lines,
        err_lines,
      } satisfies WorkerOutput,
      { status: 400, statusText: 'Code execution error' },
    );
  }
};

export default { fetch };
