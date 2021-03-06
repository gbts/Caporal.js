/// <reference types="node" />
/// <reference lib="dom" />
declare module "error/base" {
    /**
     * @packageDocumentation
     * @internal
     */
    import { ErrorMetadata } from "types";
    export class BaseError extends Error {
        meta: ErrorMetadata;
        constructor(message: string, meta?: ErrorMetadata);
    }
}
declare module "error/action" {
    /**
     * @packageDocumentation
     * @internal
     */
    import { BaseError } from "error/base";
    export class ActionError extends BaseError {
        constructor(error: string | Error);
    }
}
declare module "logger/index" {
    import type { Logger } from "types";
    export let logger: Logger;
    export function setLogger(loggerObj: Logger): void;
    export function getLogger(): Logger;
    export function createDefaultLogger(): Logger;
}
declare module "error/fatal" {
    import type { BaseError } from "error/base";
    /**
     * @param err - Error object
     */
    export function fatalError(error: BaseError): void;
}
declare module "error/invalid-validator" {
    /**
     * @packageDocumentation
     * @internal
     */
    import { BaseError } from "error/base";
    import { Validator } from "types";
    export class InvalidValidatorError extends BaseError {
        constructor(validator: Validator);
    }
}
declare module "error/missing-argument" {
    /**
     * @packageDocumentation
     * @internal
     */
    import { BaseError } from "error/base";
    import { Command } from "command/index";
    import { Argument } from "types";
    export class MissingArgumentError extends BaseError {
        constructor(argument: Argument, command: Command);
    }
}
declare module "error/missing-flag" {
    /**
     * @packageDocumentation
     * @internal
     */
    import { BaseError } from "error/base";
    import { Command } from "command/index";
    import { Option } from "types";
    export class MissingFlagError extends BaseError {
        constructor(flag: Option, command: Command);
    }
}
declare module "utils/colorize" {
    export function colorize(text: string): string;
}
declare module "error/multi-validation" {
    /**
     * @packageDocumentation
     * @internal
     */
    import { BaseError } from "error/base";
    import type { Command } from "command/index";
    export class ValidationSummaryError extends BaseError {
        constructor(cmd: Command, errors: BaseError[]);
    }
}
declare module "error/no-action" {
    /**
     * @packageDocumentation
     * @internal
     */
    import { BaseError } from "error/base";
    import { Command } from "command/index";
    export class NoActionError extends BaseError {
        constructor(cmd?: Command);
    }
}
declare module "error/option-synopsis-syntax" {
    /**
     * @packageDocumentation
     * @internal
     */
    import { BaseError } from "error/base";
    export class OptionSynopsisSyntaxError extends BaseError {
        constructor(synopsis: string);
    }
}
declare module "option/utils" {
    import type { OptionSynopsis, ParserTypes } from "types";
    export function getCleanNameFromNotation(str: string, camelCased?: boolean): string;
    export function getDashedOpt(name: string): string;
    export function isNumeric(n: string): boolean;
    export function isOptionStr(str?: string): str is string;
    export function isConcatenatedOpt(str: string): string[] | false;
    export function isNegativeOpt(opt: string): boolean;
    export function isOptArray(flag: ParserTypes | ParserTypes[]): flag is ParserTypes[];
    export function formatOptName(name: string): string;
    /**
     * Parse a option synopsis
     *
     * @example
     * parseSynopsis("-f, --file <path>")
     * // Returns...
     * {
     *    longName: 'file',
     *    longNotation: '--file',
     *    shortNotation: '-f',
     *    shortName: 'f'
     *    valueType: 0, // 0 = optional, 1 = required, 2 = no value
     *    variadic: false
     *    name: 'file'
     *    notation: '--file' // either the long or short notation
     * }
     *
     * @param synopsis
     * @ignore
     */
    export function parseOptionSynopsis(synopsis: string): OptionSynopsis;
}
declare module "validator/utils" {
    /**
     * @packageDocumentation
     * @internal
     */
    import type { Validator } from "types";
    import { Argument, Option } from "types";
    export function isCaporalValidator(validator: Validator | undefined): validator is number;
    export function isNumericValidator(validator: Validator | undefined): boolean;
    export function isStringValidator(validator: Validator | undefined): boolean;
    export function isBoolValidator(validator: Validator | undefined): boolean;
    export function isArrayValidator(validator: Validator | undefined): boolean;
    export function checkValidator(validator: Validator | undefined): void;
    export function getTypeHint(obj: Argument | Option): string | undefined;
}
declare module "help/types" {
    /**
     * @packageDocumentation
     * @module caporal/types
     */
    import { Command } from "command/index";
    import { Program } from "program/index";
    import chalk from "chalk";
    import { colorize } from "utils/colorize";
    import { buildTable } from "help/utils";
    import type { GlobalOptions } from "types";
    export interface CustomizedHelpOpts {
        /**
         * Name of the section to be added in help.
         */
        sectionName: string;
        /**
         * Enable or disable the automatic coloration of text.
         */
        colorize: boolean;
    }
    export interface CustomizedHelp {
        /**
         * Various display options.
         */
        options: CustomizedHelpOpts;
        /**
         * Help text. Padding of the text is automatically handled for you.
         */
        text: string;
    }
    export type CustomizedHelpMap = Map<Command | Program, CustomizedHelp[]>;
    export interface Template {
        (ctx: TemplateContext): Promise<string> | string;
    }
    export interface TemplateFunction {
        (name: string, ctx: TemplateContext): Promise<string> | string;
    }
    export interface TemplateContext {
        prog: Program;
        cmd?: Command;
        customHelp: CustomizedHelpMap;
        globalOptions: GlobalOptions;
        chalk: typeof chalk;
        colorize: typeof colorize;
        tpl: TemplateFunction;
        table: typeof buildTable;
        indent: (str: string) => string;
        eol: string;
        eol2: string;
        eol3: string;
        spaces: string;
    }
}
declare module "help/utils" {
    import type { TemplateContext } from "help/types";
    import type { Option, Argument } from "types";
    import type { Command } from "command/index";
    export function buildTable(data: string[][], options?: {}): string;
    export function getDefaultValueHint(obj: Argument | Option): string | undefined;
    export function getOptionsTable(options: Option[], ctx: TemplateContext, title?: string): string;
    export function getArgumentsTable(args: Argument[], ctx: TemplateContext, title?: string): string;
    export function getCommandsTable(commands: Command[], ctx: TemplateContext, title?: string): string;
}
declare module "help/templates/command" {
    /**
     * @packageDocumentation
     * @internal
     */
    import type { Template } from "help/types";
    export const command: Template;
}
declare module "help/templates/header" {
    /**
     * @packageDocumentation
     * @internal
     */
    import type { Template } from "help/types";
    export const header: Template;
}
declare module "help/templates/program" {
    /**
     * @packageDocumentation
     * @internal
     */
    import type { Template } from "help/types";
    export const program: Template;
}
declare module "help/templates/usage" {
    /**
     * @packageDocumentation
     * @internal
     */
    import type { Template } from "help/types";
    export const usage: Template;
}
declare module "help/templates/custom" {
    /**
     * @packageDocumentation
     * @internal
     */
    import type { Template } from "help/types";
    export const custom: Template;
}
declare module "help/templates/index" {
    /**
     * @packageDocumentation
     * @internal
     */
    export * from "help/templates/command";
    export * from "help/templates/header";
    export * from "help/templates/program";
    export * from "help/templates/usage";
    export * from "help/templates/custom";
}
declare module "help/index" {
    /**
     * @packageDocumentation
     * @module caporal/help
     */
    import { Command } from "command/index";
    import { Program } from "program/index";
    import { CustomizedHelpOpts, TemplateContext, Template } from "help/types";
    /**
     * Customize the help
     *
     * @param obj
     * @param text
     * @param options
     * @internal
     */
    export function customizeHelp(obj: Command | Program, text: string, options: Partial<CustomizedHelpOpts>): void;
    /**
     * Register a new help template
     *
     * @param name Template name
     * @param template Template function
     *
     */
    export function registerTemplate(name: string, template: Template): Map<string, Template>;
    /**
     * Helper to be used to call templates from within templates
     *
     * @param name Template name
     * @param ctx Execution context
     * @internal
     */
    export function tpl(name: string, ctx: TemplateContext): Promise<string>;
    /**
     * @internal
     * @param program
     * @param command
     */
    export function getContext(program: Program, command?: Command): TemplateContext;
    /**
     * Return the help text
     *
     * @param program Program instance
     * @param command Command instance, if any
     * @internal
     */
    export function getHelp(program: Program, command?: Command): Promise<string>;
}
declare module "parser/index" {
    import type { ParserOptions, ParserResult } from "types";
    /**
     * Parse a line
     *
     * @param line Line to be parsed
     * @param options Parser options
     * @internal
     */
    export function parseLine(line: string, options?: Partial<ParserOptions>): ParserResult;
    /**
     * Parse command line arguments
     *
     * @param options Parser options
     * @param argv command line arguments array (a.k.a. "argv")
     */
    export function parseArgv(options?: Partial<ParserOptions>, argv?: string[]): ParserResult;
}
declare module "validator/regexp" {
    /**
     * @packageDocumentation
     * @internal
     */
    import type { ParserTypes, Argument, Option } from "types";
    /**
     * Validate using a RegExp
     *
     * @param validator
     * @param value
     * @ignore
     */
    export function validateWithRegExp(validator: RegExp, value: ParserTypes | ParserTypes[], context: Argument | Option): ParserTypes | ParserTypes[];
}
declare module "validator/array" {
    /**
     * @packageDocumentation
     * @internal
     */
    import type { ParserTypes, Argument, Option } from "types";
    /**
     * Validate using an array of valid values.
     *
     * @param validator
     * @param value
     * @ignore
     */
    export function validateWithArray(validator: ParserTypes[], value: ParserTypes | ParserTypes[], context: Argument | Option): ParserTypes | ParserTypes[];
}
declare module "validator/function" {
    /**
     * @packageDocumentation
     * @internal
     */
    import type { ParserTypes, FunctionValidator, Argument, Option } from "types";
    export function validateWithFunction(validator: FunctionValidator, value: ParserTypes | ParserTypes[], context: Argument | Option): Promise<ParserTypes | ParserTypes[]>;
}
declare module "validator/caporal" {
    /**
     * @packageDocumentation
     * @internal
     */
    import type { ParserTypes, Argument, Option } from "types";
    import { CaporalValidator } from "types";
    export { CaporalValidator };
    export function validateWithCaporal(validator: CaporalValidator, value: ParserTypes | ParserTypes[], context: Argument | Option, skipArrayValidation?: boolean): ParserTypes | ParserTypes[];
    /**
     * The string validator actually just cast the value to string
     *
     * @param value
     * @ignore
     */
    export function validateBoolFlag(value: ParserTypes, context: Argument | Option): boolean;
    export function validateNumericFlag(validator: number, value: ParserTypes, context: Argument | Option): number;
    export function validateArrayFlag(validator: number, value: ParserTypes | ParserTypes[], context: Argument | Option): ParserTypes | ParserTypes[];
    /**
     * The string validator actually just cast the value to string
     *
     * @param value
     * @ignore
     */
    export function validateStringFlag(value: ParserTypes | ParserTypes[]): string;
}
declare module "validator/validate" {
    /**
     * @packageDocumentation
     * @internal
     */
    import type { Validator, Promisable, ParsedOption, ParsedArgument, Argument, Option } from "types";
    export function validate(value: ParsedOption | ParsedArgument, validator: Validator, context: Argument | Option): Promisable<ParsedOption | ParsedArgument>;
}
declare module "argument/find" {
    /**
     * @packageDocumentation
     * @internal
     */
    import type { Argument } from "types";
    import type { Command } from "command/index";
    export function findArgument(cmd: Command, name: string): Argument | undefined;
}
declare module "argument/validate" {
    import { BaseError } from "error/index";
    import type { ArgumentsRange, ParsedArguments, ParsedArgumentsObject } from "types";
    import type { Command } from "command/index";
    /**
     * Get the number of required argument for a given command
     *
     * @param cmd
     */
    export function getRequiredArgsCount(cmd: Command): number;
    export function getArgsObjectFromArray(cmd: Command, args: ParsedArguments): ParsedArgumentsObject;
    /**
     * Check if the given command has at leat one variadic argument
     *
     * @param cmd
     */
    export function hasVariadicArgument(cmd: Command): boolean;
    export function getArgsRange(cmd: Command): ArgumentsRange;
    export function checkRequiredArgs(cmd: Command, args: ParsedArgumentsObject, parsedArgv: ParsedArguments): BaseError[];
    export function removeCommandFromArgs(cmd: Command, args: ParsedArguments): ParsedArguments;
    interface ArgsValidationResult {
        args: ParsedArgumentsObject;
        errors: BaseError[];
    }
    /**
     *
     * @param cmd
     * @param parsedArgv
     *
     * @todo Bugs:
     *
     *
     * ts-node examples/pizza/pizza.ts cancel my-order jhazd hazd
     *
     * -> result ok, should be too many arguments
     *
     */
    export function validateArgs(cmd: Command, parsedArgv: ParsedArguments): Promise<ArgsValidationResult>;
}
declare module "command/import" {
    /**
     * @packageDocumentation
     * @internal
     */
    import { CommandCreator } from "types";
    export function importCommand(file: string): Promise<CommandCreator>;
}
declare module "command/find" {
    /**
     * @packageDocumentation
     * @internal
     */
    import type { Program } from "program/index";
    import type { Command } from "command/index";
    export function findCommand(program: Program, argv: string[]): Promise<Command | undefined>;
}
declare module "autocomplete/types" {
    /**
     * @packageDocumentation
     * @module caporal/types
     */
    import type { Argument, Option, Promisable, ParserResult } from "types";
    import type tabtab from "tabtab";
    import type { Command } from "command/index";
    import type { Program } from "program/index";
    export interface CompletionItem {
        name: string;
        description: string;
    }
    export interface Completer {
        (ctx: CompletionContext): Promisable<(string | CompletionItem)[]>;
    }
    export interface CompletionContext {
        program: Program;
        currentCmd?: Command;
        compEnv: tabtab.TabtabEnv;
        parserResult: ParserResult;
        lastPartIsOpt: boolean;
        lastPartIsKnownOpt: boolean;
        currentOpt?: Option;
    }
    export type Completions = Map<Argument | Option, Completer>;
}
declare module "autocomplete/index" {
    import { Program } from "program/index";
    import { Argument, Option } from "types";
    import { Completer, CompletionItem } from "autocomplete/types";
    /**
     * Register a completion handler
     *
     * @param {Argument|Option} arg_or_opt argument or option to complete
     * @param {Function} completer
     */
    export function registerCompletion(argOrOpt: Argument | Option, completer: Completer): void;
    export function installCompletion(program: Program): Promise<void>;
    export function uninstallCompletion(program: Program): Promise<void>;
    /**
     * Called by tabtab
     */
    export function complete(program: Program, { env, argv }?: {
        env: NodeJS.ProcessEnv;
        argv: string[];
    }): Promise<CompletionItem[] | false>;
}
declare module "option/index" {
    /**
     * @packageDocumentation
     * @module caporal/option
     */
    import { Option, CreateOptionProgramOpts, CreateOptionCommandOpts, Action, GlobalOptions, ParserProcessedResult } from "types";
    import type { Command } from "command/index";
    import type { Program } from "program/index";
    /**
     * Create an Option object
     *
     * @internal
     * @param synopsis
     * @param description
     * @param options
     */
    export function createOption(synopsis: string, description: string, options?: CreateOptionProgramOpts | CreateOptionCommandOpts): Option;
    export { showHelp };
    /**
     * Display help. Return false to prevent further processing.
     *
     * @internal
     */
    const showHelp: Action;
    /**
     * Get the list of registered global flags
     *
     * @internal
     */
    export function getGlobalOptions(): GlobalOptions;
    export function resetGlobalOptions(): GlobalOptions;
    /**
     * Disable a global option
     *
     * @param name Can be the option short/long name or notation
     */
    export function disableGlobalOption(name: string): boolean;
    /**
     * Add a global option to the program.
     * A global option is available at the program level,
     * and associated with one given {@link Action}.
     *
     * @param a {@link Option} instance, for example created using {@link createOption()}
     */
    export function addGlobalOption(opt: Option, action?: Action): GlobalOptions;
    /**
     * Process global options, if any
     * @internal
     */
    export function processGlobalOptions(parsed: ParserProcessedResult, program: Program, command?: Command): Promise<boolean>;
    /**
     * Find a global Option action from the option name (short or long)
     *
     * @param name Short or long name
     * @internal
     */
    export function findGlobalOptAction(name: string): Action | undefined;
    /**
     * Find a global Option by it's name (short or long)
     *
     * @param name Short or long name
     * @internal
     */
    export function findGlobalOption(name: string): Option | undefined;
    export function isOptionObject(obj: unknown): obj is Option;
}
declare module "utils/levenshtein" {
    /**
     * @packageDocumentation
     * @internal
     */
    export function levenshtein(a: string, b: string): number;
}
declare module "utils/suggest" {
    /**
     * Get autocomplete suggestions
     *
     * @param {String} input - User input
     * @param {String[]} possibilities - Possibilities to retrieve suggestions from
     */
    export function getSuggestions(input: string, possibilities: string[]): string[];
    /**
     * Make diff bolder in a string
     *
     * @param from original string
     * @param to target string
     */
    export function boldDiffString(from: string, to: string): string;
}
declare module "error/unknown-option" {
    /**
     * @packageDocumentation
     * @internal
     */
    import { BaseError } from "error/base";
    import type { Command } from "command/index";
    /**
     * @todo Rewrite
     */
    export class UnknownOptionError extends BaseError {
        constructor(flag: string, command: Command);
    }
}
declare module "error/unknown-command" {
    /**
     * @packageDocumentation
     * @internal
     */
    import { BaseError } from "error/base";
    import type { Program } from "program/index";
    /**
     * @todo Rewrite
     */
    export class UnknownOrUnspecifiedCommandError extends BaseError {
        constructor(program: Program, command?: string);
    }
}
declare module "error/validation" {
    import { BaseError } from "error/base";
    import { Validator, ParserTypes, Argument, Option } from "types";
    interface ValidationErrorParameters {
        value: ParserTypes | ParserTypes[];
        error?: Error | string;
        validator: Validator;
        context: Argument | Option;
    }
    export class ValidationError extends BaseError {
        constructor({ value, error, validator, context }: ValidationErrorParameters);
    }
}
declare module "error/too-many-arguments" {
    /**
     * @packageDocumentation
     * @internal
     */
    import { BaseError } from "error/base";
    import { ArgumentsRange } from "types";
    import { Command } from "command/index";
    export class TooManyArgumentsError extends BaseError {
        constructor(cmd: Command, range: ArgumentsRange, argsCount: number);
    }
}
declare module "error/index" {
    /**
     * @packageDocumentation
     * @internal
     */
    export * from "error/action";
    export * from "error/base";
    export * from "error/fatal";
    export * from "error/invalid-validator";
    export * from "error/missing-argument";
    export * from "error/missing-flag";
    export * from "error/multi-validation";
    export * from "error/no-action";
    export * from "error/option-synopsis-syntax";
    export * from "error/unknown-option";
    export * from "error/unknown-command";
    export * from "error/validation";
    export * from "error/too-many-arguments";
}
declare module "types" {
    /**
     * List of Caporal type aliases.
     *
     * @packageDocumentation
     * @module caporal/types
     */
    import { Logger as WinstonLogger } from "winston";
    import { Program } from "program/index";
    import { Command } from "command/index";
    import { BaseError } from "error/index";
    /**
     * The Caporal logger interface. It extends the [Winston](https://github.com/winstonjs/winston) Logger interface
     * and adds the following properties & methods.
     * @noInheritDoc
     */
    export interface Logger extends WinstonLogger {
        /**
         * Allow to force disabling colors.
         */
        disableColors(): void;
        /**
         * Tells Caporal if colors are enabled or not.
         */
        colorsEnabled: boolean;
    }
    export type GlobalOptions = Map<Option, Action | undefined>;
    /**
     * Caporal-provided validator flags.
     */
    export enum CaporalValidator {
        /**
         * Number validator. Check that the value looks like a numeric one
         * and cast the provided value to a javascript `Number`.
         */
        NUMBER = 1,
        /**
         * Boolean validator. Check that the value looks like a boolean.
         * It accepts values like `true`, `false`, `yes`, `no`, `0`, and `1`
         * and will auto-cast those values to `true` or `false`.
         */
        BOOLEAN = 2,
        /**
         * String validator. Mainly used to make sure the value is a string,
         * and prevent Caporal auto-casting of numerics values and boolean
         * strings like `true` or `false`.
         */
        STRING = 4,
        /**
         * Array validator. Convert any provided value to an array. If a string is provided,
         * this validator will try to split it by commas.
         */
        ARRAY = 8
    }
    type FunctionValidatorArgument = ParsedArgument | ParsedOption;
    export interface FunctionValidator<T = FunctionValidatorArgument> {
        (value: T): Promisable<T>;
    }
    export type Validator = RegExp | FunctionValidator | CaporalValidator | ParserTypes[];
    /**
     * @internal
     */
    export interface ValidatorWrapper {
        validate(value: ParsedArgument | ParsedOption): ParserTypes | ParserTypes[] | Promise<ParserTypes>;
        getChoices(): ParserTypes[];
    }
    export interface OptionSynopsis {
        name: string;
        notation: string;
        shortName?: string;
        shortNotation?: string;
        longName?: string;
        longNotation?: string;
        allNames: string[];
        allNotations: string[];
        synopsis: string;
        valueRequired: boolean;
        valueType?: OptionValueType;
        variadic: boolean;
    }
    /**
     * Option possible value.
     *
     */
    export enum OptionValueType {
        /**
         * Value is optional.
         */
        Optional = 0,
        /**
         * Value is required.
         */
        Required = 1,
        /**
         * Option does not have any possible value
         */
        None = 2
    }
    /**
     * Option properties
     */
    export interface CreateOptionCommandOpts {
        /**
         * Optional validator
         */
        validator?: Validator;
        /**
         * Default value for the Option
         */
        default?: ParsedOption;
        /**
         * Set the Option as itself required
         */
        required?: boolean;
        /**
         * Hide the option from help
         */
        hidden?: boolean;
    }
    /**
     * Option properties
     */
    export interface CreateOptionProgramOpts extends CreateOptionCommandOpts {
        /**
         * Set to `true` for a global option.
         */
        global?: boolean;
        /**
         * Action to call when a global-option is passed.
         * Only available for global options, e.g. when `global` is set to `true`.
         */
        action?: Action;
    }
    export interface CreateArgumentOpts {
        /**
         * Argument validator.
         */
        validator?: Validator;
        /**
         * Argument default value.
         */
        default?: ParsedArgument;
    }
    export interface ArgumentSynopsis {
        /**
         * Argument name.
         */
        readonly name: string;
        /**
         * Boolean indicating if the argument is required.
         */
        readonly required: boolean;
        /**
         * Synopsis string.
         */
        readonly synopsis: string;
        /**
         * Boolean indicating if the argument is valiadic,
         * e.g. can be repeated to contain an array of values.
         */
        readonly variadic: boolean;
    }
    export interface Argument extends ArgumentSynopsis {
        readonly default?: ParsedArgument;
        readonly description: string;
        readonly choices: ParsedArgument[];
        readonly validator?: Validator;
        typeHint?: string;
        kind: "argument";
    }
    export interface Option extends OptionSynopsis {
        readonly boolean: boolean;
        readonly default?: ParsedOption;
        readonly description: string;
        readonly choices: ParsedOption[];
        readonly validator?: Validator;
        readonly required: boolean;
        readonly visible: boolean;
        typeHint?: string;
        kind: "option";
    }
    /**
     * A type that could be wrapped in a Promise, or not
     */
    export type Promisable<T> = T | Promise<T>;
    /**
     * Parameters object passed to an {@link Action} function
     */
    export interface ActionParameters {
        /**
         * Parsed command line arguments
         */
        args: ParsedArgumentsObject;
        /**
         * If the `dash` (double dash) config property is enabled,
         * this *array* will contain all arguments present
         * after '--'.
         */
        ddash: ParsedArguments;
        /**
         * Parsed command line options
         */
        options: ParsedOptions;
        /**
         * Program instance
         */
        program: Program;
        /**
         * Contextual command, if any
         */
        command?: Command;
        /**
         * Logger instance
         */
        logger: Logger;
    }
    /**
     * An action is a function that will be executed upon a command call.
     */
    export interface Action {
        (params: ActionParameters): unknown;
    }
    export interface ErrorMetadata {
        [meta: string]: unknown;
    }
    export type ParserTypes = string | number | boolean;
    /**
     * Available options for the Caporal internal parser.
     * Arguments must be referenced by their position (0-based) and options by their name (short or long)
     * in {@link ParserOptions.boolean boolean}, {@link ParserOptions.string string}
     * and {@link ParserOptions.variadic variadic} parser options.
     *
     */
    export interface ParserOptions {
        /**
         * List of {@link Argument Arguments} and {@link Options Options} to be casted as *booleans*.
         * Arguments must be referenced by their position (0-based) and options by their name (short or long).
         *
         * **Example**
         *
         * ```ts
         * import { parseArgv } from "caporal/parser"
         *
         * parseArgv({
         *  boolean: [2, 'sendEmail']
         * })
         *
         * // ./my-cli-app first-arg second-arg 3rd-arg --sendEmail=1
         * // -> "3rd-arg" will be casted to boolean as well as "--sendEmail"
         * ```
         */
        boolean: (string | number)[];
        /**
         * List of {@link Argument Arguments} and {@link Options Options} to be casted as *strings*.
         * Arguments must be referenced by their position (0-based) and options by their name (short or long).
         *
         * **Example**
         *
         * ```ts
         * import { parseArgv } from "caporal/parser"
         *
         * parseArgv({
         *  string: [1]
         * })
         *
         * // ./my-cli-app first-arg 2
         * // -> second arg "2" will be casted to string instead of number
         * ```
         */
        string: (string | number)[];
        /**
         * List of variadic {@link Argument Arguments} and {@link Options Options}, meaning
         * that there value is an `Array`.
         *
         * Arguments must be referenced by their position (0-based) and options by their name (short or long).
         *
         * **Example**
         *
         * ```ts
         * import { parseArgv } from "caporal/parser"
         *
         * parseArgv({
         *  variadic: [1]
         * })
         *
         * // ./pizza order margherita regina --add sausages --add basil
         * {
         *   args: ['order', ['margherita', 'regina']]
         *   options: {
         *     add: ['sausages', 'basil']
         *   }
         * }
         * ```
         */
        variadic: (string | number)[];
        /**
         * Double-dash (--) handling mode. If `true`, the parser will populate the
         * {@link ParserResult.ddash} property, otherwise, arguments will be added
         * to {@link ParserResult.args}.
         */
        ddash: boolean;
        /**
         * Option aliases map.
         */
        alias: Record<string, string>;
        /**
         * Enable or disable autocasting of arguments and options. Default to `true`.
         */
        autoCast: boolean;
    }
    export type ParsedArgument = ParserTypes | ParserTypes[];
    export type ParsedArguments = ParsedArgument[];
    export interface ParsedArgumentsObject {
        [arg: string]: ParsedArgument;
    }
    export type ParsedOption = ParserTypes | ParserTypes[];
    export interface ParsedOptions {
        [opt: string]: ParsedOption;
    }
    /**
     * @internal
     */
    export interface ArgumentsRange {
        min: number;
        max: number;
    }
    export interface ParserResult {
        args: ParsedArguments;
        options: ParsedOptions;
        rawOptions: ParsedOptions;
        line: string;
        rawArgv: string[];
        ddash: ParsedArguments;
    }
    export interface ParserProcessedResult extends Omit<ParserResult, "args"> {
        args: ParsedArgumentsObject;
        errors: BaseError[];
    }
    export interface CreateCommandParameters {
        program: Program;
        createCommand(description?: string): Command;
    }
    export interface CommandCreator {
        (options: CreateCommandParameters): Command;
    }
    /**
     * Available configuration properties for the program.
     */
    export interface ProgramConfig {
        /**
         * Strict checking of arguments count. If enabled, any additional argument willl trigger an error.
         * Default to `true`.
         */
        strictArgsCount: boolean;
        /**
         * Strict checking of options provided. If enabled, any unknown option will trigger an error.
         * Default to `true`.
         */
        strictOptions: boolean;
        /**
         * Auto-casting of arguments and options.
         * Default to `true`.
         */
        autoCast: boolean;
        /**
         * Environment variable to check for log level override.
         * Default to "CAPORAL_LOG_LEVEL".
         */
        logLevelEnvVar: string;
    }
    export interface CommandConfig {
        /**
         * Strict checking of arguments count. If enabled, any additional argument willl trigger an error.
         */
        strictArgsCount?: boolean;
        /**
         * Strict checking of options provided. If enabled, any unknown option will trigger an error.
         */
        strictOptions?: boolean;
        /**
         * Auto-casting of arguments and options.
         */
        autoCast?: boolean;
        /**
         * Visibility of the command in help.
         */
        visible: boolean;
    }
    export interface Configurator<T extends {}> {
        get<K extends keyof T>(key: K): T[K];
        getAll(): T;
        set(props: Partial<T>): T;
        reset(): T;
    }
}
declare module "option/find" {
    /**
     * @packageDocumentation
     * @internal
     */
    import type { Command } from "command/index";
    import type { Option } from "types";
    /**
     * Find an option from its name for a given command
     *
     * @param cmd Command object
     * @param name Option name, short or long, camel-cased
     */
    export function findOption(cmd: Command, name: string): Option | undefined;
}
declare module "option/validate" {
    import { BaseError } from "error/index";
    import type { ParsedOptions } from "types";
    import type { Command } from "command/index";
    export function checkRequiredOpts(cmd: Command, opts: ParsedOptions): BaseError[];
    interface OptionsValidationResult {
        options: ParsedOptions;
        errors: BaseError[];
    }
    export function validateOptions(cmd: Command, options: ParsedOptions): Promise<OptionsValidationResult>;
}
declare module "command/validate-call" {
    /**
     * @packageDocumentation
     * @internal
     */
    import { ParserResult, ParserProcessedResult } from "types";
    import type { Command } from "command/index";
    export function validateCall(cmd: Command, result: ParserResult): Promise<ParserProcessedResult>;
}
declare module "argument/synopsis" {
    /**
     * @packageDocumentation
     * @internal
     */
    import type { ArgumentSynopsis } from "types";
    /**
     * Check if the argument is explicitly required
     *
     * @ignore
     * @param synopsis
     */
    export function isRequired(synopsis: string): boolean;
    /**
     *
     * @param synopsis
     */
    export function isVariadic(synopsis: string): boolean;
    export function parseArgumentSynopsis(synopsis: string): ArgumentSynopsis;
}
declare module "argument/index" {
    /**
     * @packageDocumentation
     * @internal
     */
    import type { Argument, CreateArgumentOpts } from "types";
    /**
     *
     * @param synopsis - Argument synopsis
     * @param description - Argument description
     * @param [options] - Various argument options like validator and default value
     */
    export function createArgument(synopsis: string, description: string, options?: CreateArgumentOpts): Argument;
}
declare module "option/mapping" {
    /**
     * @packageDocumentation
     * @internal
     */
    import type { Command } from "command/index";
    export function getOptsMapping(cmd: Command): Record<string, string>;
}
declare module "config/index" {
    /**
     * @packageDocumentation
     * @internal
     */
    import type { Configurator } from "types";
    export function createConfigurator<T>(defaults: T): Configurator<T>;
}
declare module "command/index" {
    import { Completer } from "autocomplete/types";
    import type { Program } from "program/index";
    import { Action, ParserOptions, ParserResult, Option, Argument, CreateArgumentOpts, CommandConfig, CreateOptionCommandOpts } from "types";
    import { CustomizedHelpOpts } from "help/types";
    /**
     * @ignore
     */
    export const PROG_CMD = "__self_cmd";
    /**
     * @ignore
     */
    export const HELP_CMD = "help";
    /**
     * Command class
     *
     */
    export class Command {
        private program;
        private _action?;
        private _lastAddedArgOrOpt?;
        private _aliases;
        private _name;
        private _config;
        /**
         * Command description
         *
         * @internal
         */
        readonly description: string;
        /**
         * Command options array
         *
         * @internal
         */
        readonly options: Option[];
        /**
         * Command arguments array
         *
         * @internal
         */
        readonly args: Argument[];
        /**
         *
         * @param program
         * @param name
         * @param description
         * @internal
         */
        constructor(program: Program, name: string, description: string, config?: Partial<CommandConfig>);
        /**
         * Add one or more aliases so the command can be called by different names.
         *
         * @param aliases Command aliases
         */
        alias(...aliases: string[]): Command;
        /**
         * Name getter. Will return an empty string in the program-command context
         *
         * @internal
         */
        get name(): string;
        /**
         * Add an argument to the command.
         * Synopsis is a string like `<my-argument>` or `[my-argument]`.
         * Angled brackets (e.g. `<item>`) indicate required input. Square brackets (e.g. `[env]`) indicate optional input.
         *
         * Returns the {@link Command} object to facilitate chaining of methods.
         *
         * @param synopsis Argument synopsis.
         * @param description - Argument description.
         * @param [options] - Optional parameters including validator and default value.
         */
        argument(synopsis: string, description: string, options?: CreateArgumentOpts): Command;
        /**
         * Set the corresponding action to execute for this command
         *
         * @param action Action to execute
         */
        action(action: Action): Command;
        /**
         * Allow chaining command() calls. See {@link Program.command}.
         *
         */
        command(name: string, description: string, config?: Partial<CommandConfig>): Command;
        /**
         * Makes the command the default one for the program.
         */
        default(): Command;
        /**
         * Checks if the command has the given alias registered.
         *
         * @param alias
         * @internal
         */
        hasAlias(alias: string): boolean;
        /**
         * Get command aliases.
         * @internal
         */
        getAliases(): string[];
        /**
         * @internal
         */
        isProgramCommand(): boolean;
        /**
         * @internal
         */
        isHelpCommand(): boolean;
        /**
         * Hide the command from help.
         * Shortcut to calling `.configure({ visible: false })`.
         */
        hide(): Command;
        /**
         * Add an option to the current command.
         *
         * @param synopsis Option synopsis like '-f, --force', or '-f, --file \<file\>', or '--with-openssl [path]'
         * @param description Option description
         * @param options Additional parameters
         */
        option(synopsis: string, description: string, options?: CreateOptionCommandOpts): Command;
        /**
         * @internal
         */
        getParserConfig(): Partial<ParserOptions>;
        /**
         * Return a reformated synopsis string
         * @internal
         */
        get synopsis(): string;
        /**
         * Customize command help. Can be called multiple times to add more paragraphs and/or sections.
         *
         * @param text Help contents
         * @param options Display options
         */
        help(text: string, options?: Partial<CustomizedHelpOpts>): Command;
        /**
         * Configure some behavioral properties.
         *
         * @param props properties to set/update
         */
        configure(props: Partial<CommandConfig>): Command;
        /**
         * Get a configuration property value.
         *
         * @internal
         * @param key Property key to get value for. See {@link CommandConfig}.
         */
        getConfigProperty<K extends keyof CommandConfig>(key: K): CommandConfig[K];
        /**
         * Get the auto-casting flag.
         *
         * @internal
         */
        get autoCast(): boolean;
        /**
         * Auto-complete
         */
        complete(completer: Completer): Command;
        /**
         * Toggle strict mode.
         * Shortcut to calling: `.configure({ strictArgsCount: strict, strictOptions: strict }).
         * By default, strict settings are not defined for commands, and inherit from the
         * program settings. Calling `.strict(value)` on a command will override the program
         * settings.
         *
         * @param strict boolean enabled flag
         */
        strict(strict?: boolean): Command;
        /**
         * Computed strictOptions flag.
         *
         * @internal
         */
        get strictOptions(): boolean;
        /**
         * Computed strictArgsCount flag.
         *
         * @internal
         */
        get strictArgsCount(): boolean;
        /**
         * Enable or disable auto casting of arguments & options for the command.
         * This is basically a shortcut to calling `command.configure({ autoCast: enabled })`.
         * By default, auto-casting is inherited from the program configuration.
         * This method allows overriding what's been set on the program level.
         *
         * @param enabled
         */
        cast(enabled: boolean): Command;
        /**
         * Visible flag
         *
         * @internal
         */
        get visible(): boolean;
        /**
         * Run the action associated with the command
         *
         * @internal
         */
        run(parsed: Partial<ParserResult>): Promise<unknown>;
    }
    /**
     * Create a new command
     *
     * @internal
     */
    export function createCommand(...args: ConstructorParameters<typeof Command>): InstanceType<typeof Command>;
}
declare module "utils/fs" {
    export function readdir(dirPath: string, extensions?: string): Promise<string[]>;
}
declare module "command/scan" {
    import type { Command } from "command/index";
    import type { Program } from "program/index";
    export function scanCommands(program: Program, dirPath: string): Promise<Command[]>;
}
declare module "utils/version" {
    export function detectVersion(): string | undefined;
}
declare module "program/index" {
    /**
     * @packageDocumentation
     * @module caporal/program
     */
    import { EventEmitter } from "events";
    import { Command } from "command/index";
    import { CustomizedHelpOpts } from "help/types";
    import { Action, Logger, ParserTypes, ProgramConfig, CreateArgumentOpts, CreateOptionProgramOpts, CommandConfig } from "types";
    import { CaporalValidator } from "types";
    /**
     * Program class
     *
     * @noInheritDoc
     */
    export class Program extends EventEmitter {
        private commands;
        private _config;
        private _version?;
        private _name?;
        private _description?;
        private _programmaticMode;
        /**
         * @internal
         */
        defaultCommand?: Command;
        private _progCommand?;
        private _bin;
        private _discoveryPath?;
        private _discoveredCommands?;
        /**
         * Number validator. Check that the value looks like a numeric one
         * and cast the provided value to a javascript `Number`.
         */
        readonly NUMBER = CaporalValidator.NUMBER;
        /**
         * String validator. Mainly used to make sure the value is a string,
         * and prevent Caporal auto-casting of numerical values and boolean
         * strings like `true` or `false`.
         */
        readonly STRING = CaporalValidator.STRING;
        /**
         * Array validator. Convert any provided value to an array. If a string is provided,
         * this validator will try to split it by commas.
         */
        readonly ARRAY = CaporalValidator.ARRAY;
        /**
         * Boolean validator. Check that the value looks like a boolean.
         * It accepts values like `true`, `false`, `yes`, `no`, `0`, and `1`
         * and will auto-cast those values to `true` or `false`.
         */
        readonly BOOLEAN = CaporalValidator.BOOLEAN;
        /**
         * Program constructor.
         * - Detects the "bin" name from process argv
         * - Detects the version from package.json
         * - Set up the help command
         * @ignore
         */
        constructor();
        /**
         * @internal
         */
        private setupErrorHandlers;
        /**
         * The program-command is the command attached directly to the program,
         * meaning there is no command-keyword used to trigger it.
         * Mainly used for programs executing only one possible action.
         *
         * @internal
         */
        get progCommand(): Command;
        /**
         * Setup the help command
         */
        private setupHelpCommand;
        /**
         * Customize program help. Can be called multiple times to add more paragraphs and/or sections.
         *
         * @param text Help contents
         * @param options Display options
         */
        help(text: string, options?: Partial<CustomizedHelpOpts>): Program;
        /**
         * Toggle strict mode.
         * Shortcut to calling: `.configure({ strictArgsCount: strict, strictOptions: strict })`.
         * By default, the program is strict, so if you want to disable strict checking,
         * just call `.strict(false)`. This setting can be overridden at the command level.
         *
         * @param strict boolean enabled flag
         */
        strict(strict?: boolean): Program;
        /**
         * Configure some behavioral properties.
         *
         * @param props properties to set/update
         */
        configure(props: Partial<ProgramConfig>): Program;
        /**
         * Get a configuration property value. {@link ProgramConfig Possible keys}.
         *
         * @param key Property
         * @internal
         */
        getConfigProperty<K extends keyof ProgramConfig>(key: K): ProgramConfig[K];
        /**
         * Return a reformatted synopsis string
         *
         * @internal
         */
        getSynopsis(): Promise<string>;
        /**
         * Return the discovery path, if set
         *
         * @internal
         */
        get discoveryPath(): string | undefined;
        /**
         * Return the program version
         *
         * @internal
         */
        getVersion(): string | undefined;
        /**
         * Set the version fo your program.
         * You won't likely use this method as Caporal tries to guess it from your package.json
         */
        version(ver: string): Program;
        /**
         * Set the program name. If not set, the filename minus the extension will be used.
         */
        name(name: string): Program;
        /**
         * Return the program name.
         *
         * @internal
         */
        getName(): string | undefined;
        /**
         * Return the program description.
         *
         * @internal
         */
        getDescription(): string | undefined;
        /**
         * Set the program description displayed in help.
         */
        description(desc: string): Program;
        /**
         * Get the bin name (the name of your executable).
         *
         * @internal
         */
        getBin(): string;
        /**
         * Sets the executable name. By default, it's auto-detected from the filename of your program.
         *
         * @param name Executable name
         * @example
         * ```ts
         * program.bin('myprog')
         * ```
         */
        bin(name: string): Program;
        /**
         * Set a custom logger for your program.
         * Your logger should implement the {@link Logger} interface.
         */
        logger(logger: Logger): Program;
        /**
         * Disable a global option. Will warn if the global option
         * does not exist of has already been disabled.
         *
         * @param name Name, short, or long notation of the option to disable.
         */
        disableGlobalOption(name: string): Program;
        /**
         * Returns the list of all commands registered
         * - By default, Caporal creates one: the "help" command
         * - When calling argument() or action() on the program instance,
         * Caporal also create what is called the "program command", which
         * is a command directly attach to the program, usually used
         * in mono-command programs.
         * @internal
         */
        getCommands(): Command[];
        /**
         * Add a command to the program.
         *
         * @param name Command name
         * @param description Command description
         * @example
         * ```ts
         * program.command('order', 'Order some food')
         * ```
         */
        command(name: string, description: string, config?: Partial<CommandConfig>): Command;
        /**
         * Check if the program has user-defined commands.
         *
         * @internal
         * @private
         */
        hasCommands(): Promise<boolean>;
        /**
         * @internal
         */
        getAllCommands(): Promise<Command[]>;
        /**
         * Return the log level override, if any is provided using
         * the right environment variable.
         *
         * @internal
         * @private
         */
        getLogLevelOverride(): string | undefined;
        /**
         * Enable or disable auto casting of arguments & options at the program level.
         *
         * @param enabled
         */
        cast(enabled: boolean): Program;
        /**
         * Sets a *unique* action for the *entire* program.
         *
         * @param {Function} action - Action to run
         */
        action(action: Action): Program;
        /**
         * Add an argument to the *unique* command of the program.
         */
        argument(synopsis: string, description: string, options?: CreateArgumentOpts): Command;
        /**
         * Add an option to the *unique* command of the program,
         * or add a global option to the program when `options.global`
         * is set to `true`.
         *
         * @param synopsis Option synopsis like '-f, --force', or '-f, --file \<file\>', or '--with-openssl [path]'
         * @param description Option description
         * @param options Additional parameters
         */
        option(synopsis: string, description: string, options?: CreateOptionProgramOpts): Program;
        /**
         * Discover commands from a specified path.
         *
         * Commands must be organized into files (one command per file) in a file tree like:
         *
         * ```sh
         * └── commands
         *     ├── config
         *     │   ├── set.ts
         *     │   └── unset.ts
         *     ├── create
         *     │   ├── job.ts
         *     │   └── service.ts
         *     ├── create.ts
         *     ├── describe.ts
         *     └── get.ts
         * ```
         *
         * The code above shows a short example of `kubectl` commands and subcommands.
         * In this case, Caporal will generate the following commands:
         *
         * - kubectl get [args...] [options...]
         * - kubectl config set [args...] [options...]
         * - kubectl config unset [args...] [options...]
         * - kubectl create [args...] [options...]
         * - kubectl create job [args...] [options...]
         * - kubectl create service [args...] [options...]
         * - kubectl describe [args...] [options...]
         * - kubectl get [args...] [options...]
         *
         * Notice how the `config` command has a mandatory subcommand associated,
         * hence cannot be called without a subcommand, contrary to the `create` command.
         * This is why there is no `config.ts` in the tree.
         *
         * @param path
         */
        discover(dirPath: string): Program;
        /**
         * Do a full scan of the discovery path to get all existing commands
         * This should only be used to generate the full list of command,
         * as for help rendering
         *
         * @private
         */
        private scanCommands;
        /**
         * Reset all commands
         *
         * @internal
         */
        reset(): Program;
        /**
         * Run the program by parsing command line arguments.
         * Caporal will automatically detect command line arguments from `process.argv` values,
         * but it can be overridden by providing the `argv` parameter. It returns a Promise
         * of the value returned by the *Action* triggered.
         *
         * ::: warning Be careful
         * This method returns a `Promise`. You'll usually ignore the returned promise and call run() like this:
         *
         * ```ts
         * [...]
         * program.action(...)
         * program.run()
         * ```
         *
         * If you do add some `.catch()` handler to it, Caporal won't display any potential errors
         * that the promise could reject, and will let you the responsibility to do it.
         * :::
         *
         * @param argv Command line arguments to parse, default to `process.argv.slice(2)`.
         */
        run(argv?: string[]): Promise<unknown>;
        /**
         * Try to find the executed command from argv
         * If command cannot be found from argv, return the default command if any,
         * then the program-command if any, or finally `undefined`.
         * If argv is empty, and there is no defaultCommand or progCommand
         * use the help command
         *
         * @param argv
         */
        private findCommand;
        /**
         * Run a command, providing parsed data
         *
         * @param result
         * @param cmd
         * @internal
         */
        private _run;
        /**
         * Programmatic usage. Execute input command with given arguments & options
         *
         * Not ideal regarding type casting etc.
         *
         * @param args argv array
         * @param options options object
         * @param ddash double dash array
         * @public
         */
        exec(args: string[], options?: Record<string, ParserTypes>, ddash?: string[]): Promise<unknown>;
    }
}
declare module "index" {
    /**
     * Main Caporal module.
     *
     * ## program
     *
     * This represents your program. You don't have to instanciate the {@link Program} class,
     * it's already done for you.
     *
     * **Usage**
     *
     * ```ts
     * // The Program instance generated for you
     * import program from "@caporal/core"
     *
     * program
     *  .command(...)
     *  .action(...)
     * [...]
     * ```
     *
     *
     * ## parseArgv()
     *
     *  This is the command line parser internaly used by Caporal.
     *
     * ::: tip Advanced usage
     * Usually, **you won't need to use the parser** directly, but if you
     * just want to parse some args without all capabilities brought
     * by Caporal, feel free to play with it.
     * :::
     *
     * **Usage**
     *
     * ```ts
     * import { parseArgv } from "@caporal/core"
     *
     * const {args, options} = parseArgv({
     *  // ... options
     * })
     * ```
     *
     * Checkout `parseArgv()` [documentation here](/api/modules/parser.md).
     *
     *
     * ## chalk
     *
     * `chalk` npm module re-export
     *
     * **Usage**
     *
     * ```ts
     * import { program, chalk } from "caporal"
     *
     * program
     *  .command('pay')
     *  .argument('<amount>', 'Amount to pay', Validator.NUMBER)
     *  .action(({logger, args}) => {
     *    logger.info("You paid $%s", chalk.red(args.amount))
     *  })
     * [...]
     * ```
     *
     *
     * @packageDocumentation
     * @module @caporal/core
     */
    import { Program } from "program/index";
    export { Command } from "command/index";
    export * from "types";
    /**
     * @ignore
     */
    export { default as chalk } from "chalk";
    /**
     * @ignore
     */
    export { parseArgv, parseLine } from "parser/index";
    /**
     * @ignore
     */
    export { registerTemplate } from "help/index";
    export { getCommandsTable, getOptionsTable } from "help/utils";
    /**
     * @ignore
     */
    export const program: Program;
    /**
     * @ignore
     */
    export default program;
    /**
     * @ignore
     */
    export { Program };
}
/// <amd-module name="@caporal/core" />
declare module "@caporal/core" {
    /**
     * @packageDocumentation
     * @internal
     */
    export * from "index";
}
declare module "utils/web/autocomplete" {
    /**
     * Autocomplete mock for caporal-web
     *
     * @packageDocumentation
     * @internal
     */
    import type { Program } from "program/index";
    import type { Argument, Option } from "types";
    export function registerCompletion(argOrOpt: Argument | Option, completer: Function): void;
    export function installCompletion(program: Program): Promise<void>;
    export function uninstallCompletion(program: Program): Promise<void>;
}
declare module "utils/web/process" {
    /**
     * A process mock for the web
     *
     * @packageDocumentation
     * @internal
     */
    export const version: string;
    export const argv: string[];
    export const execArgv: never[];
    export const exitCode = 0;
    export const fake = true;
    export const on: () => void;
    export const once: () => void;
    export const exit: (code?: number) => void;
}
