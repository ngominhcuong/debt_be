
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model UserProfile
 * 
 */
export type UserProfile = $Result.DefaultSelection<Prisma.$UserProfilePayload>
/**
 * Model AuthAuditLog
 * 
 */
export type AuthAuditLog = $Result.DefaultSelection<Prisma.$AuthAuditLogPayload>
/**
 * Model Partner
 * 
 */
export type Partner = $Result.DefaultSelection<Prisma.$PartnerPayload>
/**
 * Model Account
 * 
 */
export type Account = $Result.DefaultSelection<Prisma.$AccountPayload>
/**
 * Model Item
 * 
 */
export type Item = $Result.DefaultSelection<Prisma.$ItemPayload>
/**
 * Model DebtReminderConfig
 * 
 */
export type DebtReminderConfig = $Result.DefaultSelection<Prisma.$DebtReminderConfigPayload>
/**
 * Model DebtReminderLog
 * 
 */
export type DebtReminderLog = $Result.DefaultSelection<Prisma.$DebtReminderLogPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AuthUserRole: {
  CHIEF_ACCOUNTANT: 'CHIEF_ACCOUNTANT',
  STAFF_ACCOUNTANT: 'STAFF_ACCOUNTANT'
};

export type AuthUserRole = (typeof AuthUserRole)[keyof typeof AuthUserRole]


export const AuthProvider: {
  EMAIL: 'EMAIL',
  GOOGLE: 'GOOGLE'
};

export type AuthProvider = (typeof AuthProvider)[keyof typeof AuthProvider]


export const PartnerType: {
  CUSTOMER: 'CUSTOMER',
  SUPPLIER: 'SUPPLIER',
  BOTH: 'BOTH'
};

export type PartnerType = (typeof PartnerType)[keyof typeof PartnerType]


export const ItemType: {
  GOODS: 'GOODS',
  SERVICE: 'SERVICE',
  MATERIAL: 'MATERIAL',
  OTHER: 'OTHER'
};

export type ItemType = (typeof ItemType)[keyof typeof ItemType]


export const AccountType: {
  ASSET: 'ASSET',
  LIABILITY: 'LIABILITY',
  EQUITY: 'EQUITY',
  REVENUE: 'REVENUE',
  EXPENSE: 'EXPENSE',
  OFF_BALANCE: 'OFF_BALANCE'
};

export type AccountType = (typeof AccountType)[keyof typeof AccountType]


export const NormalBalance: {
  DEBIT: 'DEBIT',
  CREDIT: 'CREDIT'
};

export type NormalBalance = (typeof NormalBalance)[keyof typeof NormalBalance]


export const ReminderScope: {
  AR: 'AR',
  AP: 'AP',
  BOTH: 'BOTH'
};

export type ReminderScope = (typeof ReminderScope)[keyof typeof ReminderScope]


export const ReminderStatus: {
  PENDING: 'PENDING',
  SENT: 'SENT',
  FAILED: 'FAILED'
};

export type ReminderStatus = (typeof ReminderStatus)[keyof typeof ReminderStatus]

}

export type AuthUserRole = $Enums.AuthUserRole

export const AuthUserRole: typeof $Enums.AuthUserRole

export type AuthProvider = $Enums.AuthProvider

export const AuthProvider: typeof $Enums.AuthProvider

export type PartnerType = $Enums.PartnerType

export const PartnerType: typeof $Enums.PartnerType

export type ItemType = $Enums.ItemType

export const ItemType: typeof $Enums.ItemType

export type AccountType = $Enums.AccountType

export const AccountType: typeof $Enums.AccountType

export type NormalBalance = $Enums.NormalBalance

export const NormalBalance: typeof $Enums.NormalBalance

export type ReminderScope = $Enums.ReminderScope

export const ReminderScope: typeof $Enums.ReminderScope

export type ReminderStatus = $Enums.ReminderStatus

export const ReminderStatus: typeof $Enums.ReminderStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more UserProfiles
 * const userProfiles = await prisma.userProfile.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more UserProfiles
   * const userProfiles = await prisma.userProfile.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.userProfile`: Exposes CRUD operations for the **UserProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserProfiles
    * const userProfiles = await prisma.userProfile.findMany()
    * ```
    */
  get userProfile(): Prisma.UserProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.authAuditLog`: Exposes CRUD operations for the **AuthAuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthAuditLogs
    * const authAuditLogs = await prisma.authAuditLog.findMany()
    * ```
    */
  get authAuditLog(): Prisma.AuthAuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.partner`: Exposes CRUD operations for the **Partner** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Partners
    * const partners = await prisma.partner.findMany()
    * ```
    */
  get partner(): Prisma.PartnerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.account`: Exposes CRUD operations for the **Account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.AccountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.item`: Exposes CRUD operations for the **Item** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Items
    * const items = await prisma.item.findMany()
    * ```
    */
  get item(): Prisma.ItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.debtReminderConfig`: Exposes CRUD operations for the **DebtReminderConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DebtReminderConfigs
    * const debtReminderConfigs = await prisma.debtReminderConfig.findMany()
    * ```
    */
  get debtReminderConfig(): Prisma.DebtReminderConfigDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.debtReminderLog`: Exposes CRUD operations for the **DebtReminderLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DebtReminderLogs
    * const debtReminderLogs = await prisma.debtReminderLog.findMany()
    * ```
    */
  get debtReminderLog(): Prisma.DebtReminderLogDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    UserProfile: 'UserProfile',
    AuthAuditLog: 'AuthAuditLog',
    Partner: 'Partner',
    Account: 'Account',
    Item: 'Item',
    DebtReminderConfig: 'DebtReminderConfig',
    DebtReminderLog: 'DebtReminderLog'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "userProfile" | "authAuditLog" | "partner" | "account" | "item" | "debtReminderConfig" | "debtReminderLog"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      UserProfile: {
        payload: Prisma.$UserProfilePayload<ExtArgs>
        fields: Prisma.UserProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findFirst: {
            args: Prisma.UserProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findMany: {
            args: Prisma.UserProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          create: {
            args: Prisma.UserProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          createMany: {
            args: Prisma.UserProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          delete: {
            args: Prisma.UserProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          update: {
            args: Prisma.UserProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          deleteMany: {
            args: Prisma.UserProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          upsert: {
            args: Prisma.UserProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          aggregate: {
            args: Prisma.UserProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserProfile>
          }
          groupBy: {
            args: Prisma.UserProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserProfileCountArgs<ExtArgs>
            result: $Utils.Optional<UserProfileCountAggregateOutputType> | number
          }
        }
      }
      AuthAuditLog: {
        payload: Prisma.$AuthAuditLogPayload<ExtArgs>
        fields: Prisma.AuthAuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuthAuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthAuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuthAuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthAuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuthAuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthAuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuthAuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthAuditLogPayload>
          }
          findMany: {
            args: Prisma.AuthAuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthAuditLogPayload>[]
          }
          create: {
            args: Prisma.AuthAuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthAuditLogPayload>
          }
          createMany: {
            args: Prisma.AuthAuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuthAuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthAuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuthAuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthAuditLogPayload>
          }
          update: {
            args: Prisma.AuthAuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthAuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuthAuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuthAuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuthAuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthAuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuthAuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuthAuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuthAuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuthAuditLog>
          }
          groupBy: {
            args: Prisma.AuthAuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuthAuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuthAuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuthAuditLogCountAggregateOutputType> | number
          }
        }
      }
      Partner: {
        payload: Prisma.$PartnerPayload<ExtArgs>
        fields: Prisma.PartnerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PartnerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PartnerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          findFirst: {
            args: Prisma.PartnerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PartnerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          findMany: {
            args: Prisma.PartnerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>[]
          }
          create: {
            args: Prisma.PartnerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          createMany: {
            args: Prisma.PartnerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PartnerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>[]
          }
          delete: {
            args: Prisma.PartnerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          update: {
            args: Prisma.PartnerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          deleteMany: {
            args: Prisma.PartnerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PartnerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PartnerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>[]
          }
          upsert: {
            args: Prisma.PartnerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartnerPayload>
          }
          aggregate: {
            args: Prisma.PartnerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePartner>
          }
          groupBy: {
            args: Prisma.PartnerGroupByArgs<ExtArgs>
            result: $Utils.Optional<PartnerGroupByOutputType>[]
          }
          count: {
            args: Prisma.PartnerCountArgs<ExtArgs>
            result: $Utils.Optional<PartnerCountAggregateOutputType> | number
          }
        }
      }
      Account: {
        payload: Prisma.$AccountPayload<ExtArgs>
        fields: Prisma.AccountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AccountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AccountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findFirst: {
            args: Prisma.AccountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AccountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          findMany: {
            args: Prisma.AccountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          create: {
            args: Prisma.AccountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          createMany: {
            args: Prisma.AccountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AccountCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          delete: {
            args: Prisma.AccountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          update: {
            args: Prisma.AccountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          deleteMany: {
            args: Prisma.AccountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AccountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AccountUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>[]
          }
          upsert: {
            args: Prisma.AccountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AccountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.AccountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.AccountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      Item: {
        payload: Prisma.$ItemPayload<ExtArgs>
        fields: Prisma.ItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          findFirst: {
            args: Prisma.ItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          findMany: {
            args: Prisma.ItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>[]
          }
          create: {
            args: Prisma.ItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          createMany: {
            args: Prisma.ItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>[]
          }
          delete: {
            args: Prisma.ItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          update: {
            args: Prisma.ItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          deleteMany: {
            args: Prisma.ItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>[]
          }
          upsert: {
            args: Prisma.ItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ItemPayload>
          }
          aggregate: {
            args: Prisma.ItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateItem>
          }
          groupBy: {
            args: Prisma.ItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<ItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.ItemCountArgs<ExtArgs>
            result: $Utils.Optional<ItemCountAggregateOutputType> | number
          }
        }
      }
      DebtReminderConfig: {
        payload: Prisma.$DebtReminderConfigPayload<ExtArgs>
        fields: Prisma.DebtReminderConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DebtReminderConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DebtReminderConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderConfigPayload>
          }
          findFirst: {
            args: Prisma.DebtReminderConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DebtReminderConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderConfigPayload>
          }
          findMany: {
            args: Prisma.DebtReminderConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderConfigPayload>[]
          }
          create: {
            args: Prisma.DebtReminderConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderConfigPayload>
          }
          createMany: {
            args: Prisma.DebtReminderConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DebtReminderConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderConfigPayload>[]
          }
          delete: {
            args: Prisma.DebtReminderConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderConfigPayload>
          }
          update: {
            args: Prisma.DebtReminderConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderConfigPayload>
          }
          deleteMany: {
            args: Prisma.DebtReminderConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DebtReminderConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DebtReminderConfigUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderConfigPayload>[]
          }
          upsert: {
            args: Prisma.DebtReminderConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderConfigPayload>
          }
          aggregate: {
            args: Prisma.DebtReminderConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDebtReminderConfig>
          }
          groupBy: {
            args: Prisma.DebtReminderConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<DebtReminderConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.DebtReminderConfigCountArgs<ExtArgs>
            result: $Utils.Optional<DebtReminderConfigCountAggregateOutputType> | number
          }
        }
      }
      DebtReminderLog: {
        payload: Prisma.$DebtReminderLogPayload<ExtArgs>
        fields: Prisma.DebtReminderLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DebtReminderLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DebtReminderLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderLogPayload>
          }
          findFirst: {
            args: Prisma.DebtReminderLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DebtReminderLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderLogPayload>
          }
          findMany: {
            args: Prisma.DebtReminderLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderLogPayload>[]
          }
          create: {
            args: Prisma.DebtReminderLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderLogPayload>
          }
          createMany: {
            args: Prisma.DebtReminderLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DebtReminderLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderLogPayload>[]
          }
          delete: {
            args: Prisma.DebtReminderLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderLogPayload>
          }
          update: {
            args: Prisma.DebtReminderLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderLogPayload>
          }
          deleteMany: {
            args: Prisma.DebtReminderLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DebtReminderLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DebtReminderLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderLogPayload>[]
          }
          upsert: {
            args: Prisma.DebtReminderLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DebtReminderLogPayload>
          }
          aggregate: {
            args: Prisma.DebtReminderLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDebtReminderLog>
          }
          groupBy: {
            args: Prisma.DebtReminderLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<DebtReminderLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.DebtReminderLogCountArgs<ExtArgs>
            result: $Utils.Optional<DebtReminderLogCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    userProfile?: UserProfileOmit
    authAuditLog?: AuthAuditLogOmit
    partner?: PartnerOmit
    account?: AccountOmit
    item?: ItemOmit
    debtReminderConfig?: DebtReminderConfigOmit
    debtReminderLog?: DebtReminderLogOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserProfileCountOutputType
   */

  export type UserProfileCountOutputType = {
    auditLogs: number
  }

  export type UserProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auditLogs?: boolean | UserProfileCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * UserProfileCountOutputType without action
   */
  export type UserProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfileCountOutputType
     */
    select?: UserProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserProfileCountOutputType without action
   */
  export type UserProfileCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthAuditLogWhereInput
  }


  /**
   * Count Type PartnerCountOutputType
   */

  export type PartnerCountOutputType = {
    debtReminders: number
    debtReminderLogs: number
  }

  export type PartnerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    debtReminders?: boolean | PartnerCountOutputTypeCountDebtRemindersArgs
    debtReminderLogs?: boolean | PartnerCountOutputTypeCountDebtReminderLogsArgs
  }

  // Custom InputTypes
  /**
   * PartnerCountOutputType without action
   */
  export type PartnerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartnerCountOutputType
     */
    select?: PartnerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PartnerCountOutputType without action
   */
  export type PartnerCountOutputTypeCountDebtRemindersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DebtReminderConfigWhereInput
  }

  /**
   * PartnerCountOutputType without action
   */
  export type PartnerCountOutputTypeCountDebtReminderLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DebtReminderLogWhereInput
  }


  /**
   * Count Type AccountCountOutputType
   */

  export type AccountCountOutputType = {
    children: number
    revenueItems: number
    cogsItems: number
    inventoryItems: number
  }

  export type AccountCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | AccountCountOutputTypeCountChildrenArgs
    revenueItems?: boolean | AccountCountOutputTypeCountRevenueItemsArgs
    cogsItems?: boolean | AccountCountOutputTypeCountCogsItemsArgs
    inventoryItems?: boolean | AccountCountOutputTypeCountInventoryItemsArgs
  }

  // Custom InputTypes
  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AccountCountOutputType
     */
    select?: AccountCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountRevenueItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountCogsItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
  }

  /**
   * AccountCountOutputType without action
   */
  export type AccountCountOutputTypeCountInventoryItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model UserProfile
   */

  export type AggregateUserProfile = {
    _count: UserProfileCountAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  export type UserProfileMinAggregateOutputType = {
    id: string | null
    email: string | null
    fullName: string | null
    role: $Enums.AuthUserRole | null
    provider: $Enums.AuthProvider | null
    avatarUrl: string | null
    isEmailVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserProfileMaxAggregateOutputType = {
    id: string | null
    email: string | null
    fullName: string | null
    role: $Enums.AuthUserRole | null
    provider: $Enums.AuthProvider | null
    avatarUrl: string | null
    isEmailVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserProfileCountAggregateOutputType = {
    id: number
    email: number
    fullName: number
    role: number
    provider: number
    avatarUrl: number
    isEmailVerified: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserProfileMinAggregateInputType = {
    id?: true
    email?: true
    fullName?: true
    role?: true
    provider?: true
    avatarUrl?: true
    isEmailVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserProfileMaxAggregateInputType = {
    id?: true
    email?: true
    fullName?: true
    role?: true
    provider?: true
    avatarUrl?: true
    isEmailVerified?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserProfileCountAggregateInputType = {
    id?: true
    email?: true
    fullName?: true
    role?: true
    provider?: true
    avatarUrl?: true
    isEmailVerified?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfile to aggregate.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserProfiles
    **/
    _count?: true | UserProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserProfileMaxAggregateInputType
  }

  export type GetUserProfileAggregateType<T extends UserProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateUserProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserProfile[P]>
      : GetScalarType<T[P], AggregateUserProfile[P]>
  }




  export type UserProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProfileWhereInput
    orderBy?: UserProfileOrderByWithAggregationInput | UserProfileOrderByWithAggregationInput[]
    by: UserProfileScalarFieldEnum[] | UserProfileScalarFieldEnum
    having?: UserProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserProfileCountAggregateInputType | true
    _min?: UserProfileMinAggregateInputType
    _max?: UserProfileMaxAggregateInputType
  }

  export type UserProfileGroupByOutputType = {
    id: string
    email: string
    fullName: string | null
    role: $Enums.AuthUserRole
    provider: $Enums.AuthProvider
    avatarUrl: string | null
    isEmailVerified: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserProfileCountAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  type GetUserProfileGroupByPayload<T extends UserProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
            : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
        }
      >
    >


  export type UserProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    fullName?: boolean
    role?: boolean
    provider?: boolean
    avatarUrl?: boolean
    isEmailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    auditLogs?: boolean | UserProfile$auditLogsArgs<ExtArgs>
    _count?: boolean | UserProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    fullName?: boolean
    role?: boolean
    provider?: boolean
    avatarUrl?: boolean
    isEmailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    fullName?: boolean
    role?: boolean
    provider?: boolean
    avatarUrl?: boolean
    isEmailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectScalar = {
    id?: boolean
    email?: boolean
    fullName?: boolean
    role?: boolean
    provider?: boolean
    avatarUrl?: boolean
    isEmailVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "fullName" | "role" | "provider" | "avatarUrl" | "isEmailVerified" | "createdAt" | "updatedAt", ExtArgs["result"]["userProfile"]>
  export type UserProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auditLogs?: boolean | UserProfile$auditLogsArgs<ExtArgs>
    _count?: boolean | UserProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserProfile"
    objects: {
      auditLogs: Prisma.$AuthAuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      fullName: string | null
      role: $Enums.AuthUserRole
      provider: $Enums.AuthProvider
      avatarUrl: string | null
      isEmailVerified: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userProfile"]>
    composites: {}
  }

  type UserProfileGetPayload<S extends boolean | null | undefined | UserProfileDefaultArgs> = $Result.GetResult<Prisma.$UserProfilePayload, S>

  type UserProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserProfileCountAggregateInputType | true
    }

  export interface UserProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserProfile'], meta: { name: 'UserProfile' } }
    /**
     * Find zero or one UserProfile that matches the filter.
     * @param {UserProfileFindUniqueArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserProfileFindUniqueArgs>(args: SelectSubset<T, UserProfileFindUniqueArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserProfileFindUniqueOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, UserProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserProfileFindFirstArgs>(args?: SelectSubset<T, UserProfileFindFirstArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, UserProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserProfiles
     * const userProfiles = await prisma.userProfile.findMany()
     * 
     * // Get first 10 UserProfiles
     * const userProfiles = await prisma.userProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserProfileFindManyArgs>(args?: SelectSubset<T, UserProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserProfile.
     * @param {UserProfileCreateArgs} args - Arguments to create a UserProfile.
     * @example
     * // Create one UserProfile
     * const UserProfile = await prisma.userProfile.create({
     *   data: {
     *     // ... data to create a UserProfile
     *   }
     * })
     * 
     */
    create<T extends UserProfileCreateArgs>(args: SelectSubset<T, UserProfileCreateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserProfiles.
     * @param {UserProfileCreateManyArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserProfileCreateManyArgs>(args?: SelectSubset<T, UserProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserProfiles and returns the data saved in the database.
     * @param {UserProfileCreateManyAndReturnArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserProfiles and only return the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, UserProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserProfile.
     * @param {UserProfileDeleteArgs} args - Arguments to delete one UserProfile.
     * @example
     * // Delete one UserProfile
     * const UserProfile = await prisma.userProfile.delete({
     *   where: {
     *     // ... filter to delete one UserProfile
     *   }
     * })
     * 
     */
    delete<T extends UserProfileDeleteArgs>(args: SelectSubset<T, UserProfileDeleteArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserProfile.
     * @param {UserProfileUpdateArgs} args - Arguments to update one UserProfile.
     * @example
     * // Update one UserProfile
     * const userProfile = await prisma.userProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserProfileUpdateArgs>(args: SelectSubset<T, UserProfileUpdateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserProfiles.
     * @param {UserProfileDeleteManyArgs} args - Arguments to filter UserProfiles to delete.
     * @example
     * // Delete a few UserProfiles
     * const { count } = await prisma.userProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserProfileDeleteManyArgs>(args?: SelectSubset<T, UserProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserProfileUpdateManyArgs>(args: SelectSubset<T, UserProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles and returns the data updated in the database.
     * @param {UserProfileUpdateManyAndReturnArgs} args - Arguments to update many UserProfiles.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserProfiles and only return the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, UserProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserProfile.
     * @param {UserProfileUpsertArgs} args - Arguments to update or create a UserProfile.
     * @example
     * // Update or create a UserProfile
     * const userProfile = await prisma.userProfile.upsert({
     *   create: {
     *     // ... data to create a UserProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserProfile we want to update
     *   }
     * })
     */
    upsert<T extends UserProfileUpsertArgs>(args: SelectSubset<T, UserProfileUpsertArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileCountArgs} args - Arguments to filter UserProfiles to count.
     * @example
     * // Count the number of UserProfiles
     * const count = await prisma.userProfile.count({
     *   where: {
     *     // ... the filter for the UserProfiles we want to count
     *   }
     * })
    **/
    count<T extends UserProfileCountArgs>(
      args?: Subset<T, UserProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserProfileAggregateArgs>(args: Subset<T, UserProfileAggregateArgs>): Prisma.PrismaPromise<GetUserProfileAggregateType<T>>

    /**
     * Group by UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserProfileGroupByArgs['orderBy'] }
        : { orderBy?: UserProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserProfile model
   */
  readonly fields: UserProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    auditLogs<T extends UserProfile$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, UserProfile$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthAuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserProfile model
   */
  interface UserProfileFieldRefs {
    readonly id: FieldRef<"UserProfile", 'String'>
    readonly email: FieldRef<"UserProfile", 'String'>
    readonly fullName: FieldRef<"UserProfile", 'String'>
    readonly role: FieldRef<"UserProfile", 'AuthUserRole'>
    readonly provider: FieldRef<"UserProfile", 'AuthProvider'>
    readonly avatarUrl: FieldRef<"UserProfile", 'String'>
    readonly isEmailVerified: FieldRef<"UserProfile", 'Boolean'>
    readonly createdAt: FieldRef<"UserProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"UserProfile", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserProfile findUnique
   */
  export type UserProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findUniqueOrThrow
   */
  export type UserProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findFirst
   */
  export type UserProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findFirstOrThrow
   */
  export type UserProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findMany
   */
  export type UserProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfiles to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile create
   */
  export type UserProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a UserProfile.
     */
    data: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
  }

  /**
   * UserProfile createMany
   */
  export type UserProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserProfile createManyAndReturn
   */
  export type UserProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserProfile update
   */
  export type UserProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a UserProfile.
     */
    data: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
    /**
     * Choose, which UserProfile to update.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile updateMany
   */
  export type UserProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
  }

  /**
   * UserProfile updateManyAndReturn
   */
  export type UserProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
  }

  /**
   * UserProfile upsert
   */
  export type UserProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the UserProfile to update in case it exists.
     */
    where: UserProfileWhereUniqueInput
    /**
     * In case the UserProfile found by the `where` argument doesn't exist, create a new UserProfile with this data.
     */
    create: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
    /**
     * In case the UserProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
  }

  /**
   * UserProfile delete
   */
  export type UserProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter which UserProfile to delete.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile deleteMany
   */
  export type UserProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfiles to delete
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to delete.
     */
    limit?: number
  }

  /**
   * UserProfile.auditLogs
   */
  export type UserProfile$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthAuditLog
     */
    select?: AuthAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthAuditLog
     */
    omit?: AuthAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthAuditLogInclude<ExtArgs> | null
    where?: AuthAuditLogWhereInput
    orderBy?: AuthAuditLogOrderByWithRelationInput | AuthAuditLogOrderByWithRelationInput[]
    cursor?: AuthAuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuthAuditLogScalarFieldEnum | AuthAuditLogScalarFieldEnum[]
  }

  /**
   * UserProfile without action
   */
  export type UserProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
  }


  /**
   * Model AuthAuditLog
   */

  export type AggregateAuthAuditLog = {
    _count: AuthAuditLogCountAggregateOutputType | null
    _avg: AuthAuditLogAvgAggregateOutputType | null
    _sum: AuthAuditLogSumAggregateOutputType | null
    _min: AuthAuditLogMinAggregateOutputType | null
    _max: AuthAuditLogMaxAggregateOutputType | null
  }

  export type AuthAuditLogAvgAggregateOutputType = {
    id: number | null
  }

  export type AuthAuditLogSumAggregateOutputType = {
    id: bigint | null
  }

  export type AuthAuditLogMinAggregateOutputType = {
    id: bigint | null
    userId: string | null
    email: string | null
    action: string | null
    success: boolean | null
    message: string | null
    provider: $Enums.AuthProvider | null
    role: $Enums.AuthUserRole | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type AuthAuditLogMaxAggregateOutputType = {
    id: bigint | null
    userId: string | null
    email: string | null
    action: string | null
    success: boolean | null
    message: string | null
    provider: $Enums.AuthProvider | null
    role: $Enums.AuthUserRole | null
    ipAddress: string | null
    createdAt: Date | null
  }

  export type AuthAuditLogCountAggregateOutputType = {
    id: number
    userId: number
    email: number
    action: number
    success: number
    message: number
    provider: number
    role: number
    ipAddress: number
    createdAt: number
    _all: number
  }


  export type AuthAuditLogAvgAggregateInputType = {
    id?: true
  }

  export type AuthAuditLogSumAggregateInputType = {
    id?: true
  }

  export type AuthAuditLogMinAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    action?: true
    success?: true
    message?: true
    provider?: true
    role?: true
    ipAddress?: true
    createdAt?: true
  }

  export type AuthAuditLogMaxAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    action?: true
    success?: true
    message?: true
    provider?: true
    role?: true
    ipAddress?: true
    createdAt?: true
  }

  export type AuthAuditLogCountAggregateInputType = {
    id?: true
    userId?: true
    email?: true
    action?: true
    success?: true
    message?: true
    provider?: true
    role?: true
    ipAddress?: true
    createdAt?: true
    _all?: true
  }

  export type AuthAuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthAuditLog to aggregate.
     */
    where?: AuthAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthAuditLogs to fetch.
     */
    orderBy?: AuthAuditLogOrderByWithRelationInput | AuthAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuthAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthAuditLogs
    **/
    _count?: true | AuthAuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuthAuditLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuthAuditLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthAuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthAuditLogMaxAggregateInputType
  }

  export type GetAuthAuditLogAggregateType<T extends AuthAuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthAuditLog[P]>
      : GetScalarType<T[P], AggregateAuthAuditLog[P]>
  }




  export type AuthAuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuthAuditLogWhereInput
    orderBy?: AuthAuditLogOrderByWithAggregationInput | AuthAuditLogOrderByWithAggregationInput[]
    by: AuthAuditLogScalarFieldEnum[] | AuthAuditLogScalarFieldEnum
    having?: AuthAuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthAuditLogCountAggregateInputType | true
    _avg?: AuthAuditLogAvgAggregateInputType
    _sum?: AuthAuditLogSumAggregateInputType
    _min?: AuthAuditLogMinAggregateInputType
    _max?: AuthAuditLogMaxAggregateInputType
  }

  export type AuthAuditLogGroupByOutputType = {
    id: bigint
    userId: string | null
    email: string | null
    action: string
    success: boolean
    message: string | null
    provider: $Enums.AuthProvider | null
    role: $Enums.AuthUserRole | null
    ipAddress: string | null
    createdAt: Date
    _count: AuthAuditLogCountAggregateOutputType | null
    _avg: AuthAuditLogAvgAggregateOutputType | null
    _sum: AuthAuditLogSumAggregateOutputType | null
    _min: AuthAuditLogMinAggregateOutputType | null
    _max: AuthAuditLogMaxAggregateOutputType | null
  }

  type GetAuthAuditLogGroupByPayload<T extends AuthAuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuthAuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthAuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthAuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuthAuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuthAuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    action?: boolean
    success?: boolean
    message?: boolean
    provider?: boolean
    role?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    user?: boolean | AuthAuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["authAuditLog"]>

  export type AuthAuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    action?: boolean
    success?: boolean
    message?: boolean
    provider?: boolean
    role?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    user?: boolean | AuthAuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["authAuditLog"]>

  export type AuthAuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    email?: boolean
    action?: boolean
    success?: boolean
    message?: boolean
    provider?: boolean
    role?: boolean
    ipAddress?: boolean
    createdAt?: boolean
    user?: boolean | AuthAuditLog$userArgs<ExtArgs>
  }, ExtArgs["result"]["authAuditLog"]>

  export type AuthAuditLogSelectScalar = {
    id?: boolean
    userId?: boolean
    email?: boolean
    action?: boolean
    success?: boolean
    message?: boolean
    provider?: boolean
    role?: boolean
    ipAddress?: boolean
    createdAt?: boolean
  }

  export type AuthAuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "email" | "action" | "success" | "message" | "provider" | "role" | "ipAddress" | "createdAt", ExtArgs["result"]["authAuditLog"]>
  export type AuthAuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuthAuditLog$userArgs<ExtArgs>
  }
  export type AuthAuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuthAuditLog$userArgs<ExtArgs>
  }
  export type AuthAuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | AuthAuditLog$userArgs<ExtArgs>
  }

  export type $AuthAuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuthAuditLog"
    objects: {
      user: Prisma.$UserProfilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      userId: string | null
      email: string | null
      action: string
      success: boolean
      message: string | null
      provider: $Enums.AuthProvider | null
      role: $Enums.AuthUserRole | null
      ipAddress: string | null
      createdAt: Date
    }, ExtArgs["result"]["authAuditLog"]>
    composites: {}
  }

  type AuthAuditLogGetPayload<S extends boolean | null | undefined | AuthAuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuthAuditLogPayload, S>

  type AuthAuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuthAuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuthAuditLogCountAggregateInputType | true
    }

  export interface AuthAuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuthAuditLog'], meta: { name: 'AuthAuditLog' } }
    /**
     * Find zero or one AuthAuditLog that matches the filter.
     * @param {AuthAuditLogFindUniqueArgs} args - Arguments to find a AuthAuditLog
     * @example
     * // Get one AuthAuditLog
     * const authAuditLog = await prisma.authAuditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuthAuditLogFindUniqueArgs>(args: SelectSubset<T, AuthAuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuthAuditLogClient<$Result.GetResult<Prisma.$AuthAuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuthAuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuthAuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuthAuditLog
     * @example
     * // Get one AuthAuditLog
     * const authAuditLog = await prisma.authAuditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuthAuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuthAuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuthAuditLogClient<$Result.GetResult<Prisma.$AuthAuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthAuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthAuditLogFindFirstArgs} args - Arguments to find a AuthAuditLog
     * @example
     * // Get one AuthAuditLog
     * const authAuditLog = await prisma.authAuditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuthAuditLogFindFirstArgs>(args?: SelectSubset<T, AuthAuditLogFindFirstArgs<ExtArgs>>): Prisma__AuthAuditLogClient<$Result.GetResult<Prisma.$AuthAuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuthAuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthAuditLogFindFirstOrThrowArgs} args - Arguments to find a AuthAuditLog
     * @example
     * // Get one AuthAuditLog
     * const authAuditLog = await prisma.authAuditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuthAuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuthAuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuthAuditLogClient<$Result.GetResult<Prisma.$AuthAuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuthAuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthAuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthAuditLogs
     * const authAuditLogs = await prisma.authAuditLog.findMany()
     * 
     * // Get first 10 AuthAuditLogs
     * const authAuditLogs = await prisma.authAuditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const authAuditLogWithIdOnly = await prisma.authAuditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuthAuditLogFindManyArgs>(args?: SelectSubset<T, AuthAuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthAuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuthAuditLog.
     * @param {AuthAuditLogCreateArgs} args - Arguments to create a AuthAuditLog.
     * @example
     * // Create one AuthAuditLog
     * const AuthAuditLog = await prisma.authAuditLog.create({
     *   data: {
     *     // ... data to create a AuthAuditLog
     *   }
     * })
     * 
     */
    create<T extends AuthAuditLogCreateArgs>(args: SelectSubset<T, AuthAuditLogCreateArgs<ExtArgs>>): Prisma__AuthAuditLogClient<$Result.GetResult<Prisma.$AuthAuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuthAuditLogs.
     * @param {AuthAuditLogCreateManyArgs} args - Arguments to create many AuthAuditLogs.
     * @example
     * // Create many AuthAuditLogs
     * const authAuditLog = await prisma.authAuditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuthAuditLogCreateManyArgs>(args?: SelectSubset<T, AuthAuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuthAuditLogs and returns the data saved in the database.
     * @param {AuthAuditLogCreateManyAndReturnArgs} args - Arguments to create many AuthAuditLogs.
     * @example
     * // Create many AuthAuditLogs
     * const authAuditLog = await prisma.authAuditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuthAuditLogs and only return the `id`
     * const authAuditLogWithIdOnly = await prisma.authAuditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuthAuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuthAuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthAuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuthAuditLog.
     * @param {AuthAuditLogDeleteArgs} args - Arguments to delete one AuthAuditLog.
     * @example
     * // Delete one AuthAuditLog
     * const AuthAuditLog = await prisma.authAuditLog.delete({
     *   where: {
     *     // ... filter to delete one AuthAuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuthAuditLogDeleteArgs>(args: SelectSubset<T, AuthAuditLogDeleteArgs<ExtArgs>>): Prisma__AuthAuditLogClient<$Result.GetResult<Prisma.$AuthAuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuthAuditLog.
     * @param {AuthAuditLogUpdateArgs} args - Arguments to update one AuthAuditLog.
     * @example
     * // Update one AuthAuditLog
     * const authAuditLog = await prisma.authAuditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuthAuditLogUpdateArgs>(args: SelectSubset<T, AuthAuditLogUpdateArgs<ExtArgs>>): Prisma__AuthAuditLogClient<$Result.GetResult<Prisma.$AuthAuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuthAuditLogs.
     * @param {AuthAuditLogDeleteManyArgs} args - Arguments to filter AuthAuditLogs to delete.
     * @example
     * // Delete a few AuthAuditLogs
     * const { count } = await prisma.authAuditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuthAuditLogDeleteManyArgs>(args?: SelectSubset<T, AuthAuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthAuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthAuditLogs
     * const authAuditLog = await prisma.authAuditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuthAuditLogUpdateManyArgs>(args: SelectSubset<T, AuthAuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthAuditLogs and returns the data updated in the database.
     * @param {AuthAuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuthAuditLogs.
     * @example
     * // Update many AuthAuditLogs
     * const authAuditLog = await prisma.authAuditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuthAuditLogs and only return the `id`
     * const authAuditLogWithIdOnly = await prisma.authAuditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuthAuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuthAuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuthAuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuthAuditLog.
     * @param {AuthAuditLogUpsertArgs} args - Arguments to update or create a AuthAuditLog.
     * @example
     * // Update or create a AuthAuditLog
     * const authAuditLog = await prisma.authAuditLog.upsert({
     *   create: {
     *     // ... data to create a AuthAuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthAuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuthAuditLogUpsertArgs>(args: SelectSubset<T, AuthAuditLogUpsertArgs<ExtArgs>>): Prisma__AuthAuditLogClient<$Result.GetResult<Prisma.$AuthAuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuthAuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthAuditLogCountArgs} args - Arguments to filter AuthAuditLogs to count.
     * @example
     * // Count the number of AuthAuditLogs
     * const count = await prisma.authAuditLog.count({
     *   where: {
     *     // ... the filter for the AuthAuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuthAuditLogCountArgs>(
      args?: Subset<T, AuthAuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthAuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthAuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthAuditLogAggregateArgs>(args: Subset<T, AuthAuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuthAuditLogAggregateType<T>>

    /**
     * Group by AuthAuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthAuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthAuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthAuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuthAuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthAuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuthAuditLog model
   */
  readonly fields: AuthAuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthAuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuthAuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends AuthAuditLog$userArgs<ExtArgs> = {}>(args?: Subset<T, AuthAuditLog$userArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuthAuditLog model
   */
  interface AuthAuditLogFieldRefs {
    readonly id: FieldRef<"AuthAuditLog", 'BigInt'>
    readonly userId: FieldRef<"AuthAuditLog", 'String'>
    readonly email: FieldRef<"AuthAuditLog", 'String'>
    readonly action: FieldRef<"AuthAuditLog", 'String'>
    readonly success: FieldRef<"AuthAuditLog", 'Boolean'>
    readonly message: FieldRef<"AuthAuditLog", 'String'>
    readonly provider: FieldRef<"AuthAuditLog", 'AuthProvider'>
    readonly role: FieldRef<"AuthAuditLog", 'AuthUserRole'>
    readonly ipAddress: FieldRef<"AuthAuditLog", 'String'>
    readonly createdAt: FieldRef<"AuthAuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuthAuditLog findUnique
   */
  export type AuthAuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthAuditLog
     */
    select?: AuthAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthAuditLog
     */
    omit?: AuthAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuthAuditLog to fetch.
     */
    where: AuthAuditLogWhereUniqueInput
  }

  /**
   * AuthAuditLog findUniqueOrThrow
   */
  export type AuthAuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthAuditLog
     */
    select?: AuthAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthAuditLog
     */
    omit?: AuthAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuthAuditLog to fetch.
     */
    where: AuthAuditLogWhereUniqueInput
  }

  /**
   * AuthAuditLog findFirst
   */
  export type AuthAuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthAuditLog
     */
    select?: AuthAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthAuditLog
     */
    omit?: AuthAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuthAuditLog to fetch.
     */
    where?: AuthAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthAuditLogs to fetch.
     */
    orderBy?: AuthAuditLogOrderByWithRelationInput | AuthAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthAuditLogs.
     */
    cursor?: AuthAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthAuditLogs.
     */
    distinct?: AuthAuditLogScalarFieldEnum | AuthAuditLogScalarFieldEnum[]
  }

  /**
   * AuthAuditLog findFirstOrThrow
   */
  export type AuthAuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthAuditLog
     */
    select?: AuthAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthAuditLog
     */
    omit?: AuthAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuthAuditLog to fetch.
     */
    where?: AuthAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthAuditLogs to fetch.
     */
    orderBy?: AuthAuditLogOrderByWithRelationInput | AuthAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthAuditLogs.
     */
    cursor?: AuthAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthAuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthAuditLogs.
     */
    distinct?: AuthAuditLogScalarFieldEnum | AuthAuditLogScalarFieldEnum[]
  }

  /**
   * AuthAuditLog findMany
   */
  export type AuthAuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthAuditLog
     */
    select?: AuthAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthAuditLog
     */
    omit?: AuthAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthAuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuthAuditLogs to fetch.
     */
    where?: AuthAuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthAuditLogs to fetch.
     */
    orderBy?: AuthAuditLogOrderByWithRelationInput | AuthAuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthAuditLogs.
     */
    cursor?: AuthAuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthAuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthAuditLogs.
     */
    skip?: number
    distinct?: AuthAuditLogScalarFieldEnum | AuthAuditLogScalarFieldEnum[]
  }

  /**
   * AuthAuditLog create
   */
  export type AuthAuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthAuditLog
     */
    select?: AuthAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthAuditLog
     */
    omit?: AuthAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthAuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuthAuditLog.
     */
    data: XOR<AuthAuditLogCreateInput, AuthAuditLogUncheckedCreateInput>
  }

  /**
   * AuthAuditLog createMany
   */
  export type AuthAuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuthAuditLogs.
     */
    data: AuthAuditLogCreateManyInput | AuthAuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuthAuditLog createManyAndReturn
   */
  export type AuthAuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthAuditLog
     */
    select?: AuthAuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthAuditLog
     */
    omit?: AuthAuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuthAuditLogs.
     */
    data: AuthAuditLogCreateManyInput | AuthAuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthAuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuthAuditLog update
   */
  export type AuthAuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthAuditLog
     */
    select?: AuthAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthAuditLog
     */
    omit?: AuthAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthAuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuthAuditLog.
     */
    data: XOR<AuthAuditLogUpdateInput, AuthAuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuthAuditLog to update.
     */
    where: AuthAuditLogWhereUniqueInput
  }

  /**
   * AuthAuditLog updateMany
   */
  export type AuthAuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuthAuditLogs.
     */
    data: XOR<AuthAuditLogUpdateManyMutationInput, AuthAuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuthAuditLogs to update
     */
    where?: AuthAuditLogWhereInput
    /**
     * Limit how many AuthAuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuthAuditLog updateManyAndReturn
   */
  export type AuthAuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthAuditLog
     */
    select?: AuthAuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuthAuditLog
     */
    omit?: AuthAuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuthAuditLogs.
     */
    data: XOR<AuthAuditLogUpdateManyMutationInput, AuthAuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuthAuditLogs to update
     */
    where?: AuthAuditLogWhereInput
    /**
     * Limit how many AuthAuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthAuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuthAuditLog upsert
   */
  export type AuthAuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthAuditLog
     */
    select?: AuthAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthAuditLog
     */
    omit?: AuthAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthAuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuthAuditLog to update in case it exists.
     */
    where: AuthAuditLogWhereUniqueInput
    /**
     * In case the AuthAuditLog found by the `where` argument doesn't exist, create a new AuthAuditLog with this data.
     */
    create: XOR<AuthAuditLogCreateInput, AuthAuditLogUncheckedCreateInput>
    /**
     * In case the AuthAuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuthAuditLogUpdateInput, AuthAuditLogUncheckedUpdateInput>
  }

  /**
   * AuthAuditLog delete
   */
  export type AuthAuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthAuditLog
     */
    select?: AuthAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthAuditLog
     */
    omit?: AuthAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthAuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuthAuditLog to delete.
     */
    where: AuthAuditLogWhereUniqueInput
  }

  /**
   * AuthAuditLog deleteMany
   */
  export type AuthAuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuthAuditLogs to delete
     */
    where?: AuthAuditLogWhereInput
    /**
     * Limit how many AuthAuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuthAuditLog.user
   */
  export type AuthAuditLog$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    where?: UserProfileWhereInput
  }

  /**
   * AuthAuditLog without action
   */
  export type AuthAuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuthAuditLog
     */
    select?: AuthAuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuthAuditLog
     */
    omit?: AuthAuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuthAuditLogInclude<ExtArgs> | null
  }


  /**
   * Model Partner
   */

  export type AggregatePartner = {
    _count: PartnerCountAggregateOutputType | null
    _avg: PartnerAvgAggregateOutputType | null
    _sum: PartnerSumAggregateOutputType | null
    _min: PartnerMinAggregateOutputType | null
    _max: PartnerMaxAggregateOutputType | null
  }

  export type PartnerAvgAggregateOutputType = {
    paymentTermDays: number | null
    creditLimit: Decimal | null
  }

  export type PartnerSumAggregateOutputType = {
    paymentTermDays: number | null
    creditLimit: Decimal | null
  }

  export type PartnerMinAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    partnerType: $Enums.PartnerType | null
    taxCode: string | null
    phone: string | null
    email: string | null
    address: string | null
    paymentTermDays: number | null
    creditLimit: Decimal | null
    isActive: boolean | null
    debtReminderOn: boolean | null
    reminderEmail: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartnerMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    partnerType: $Enums.PartnerType | null
    taxCode: string | null
    phone: string | null
    email: string | null
    address: string | null
    paymentTermDays: number | null
    creditLimit: Decimal | null
    isActive: boolean | null
    debtReminderOn: boolean | null
    reminderEmail: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PartnerCountAggregateOutputType = {
    id: number
    code: number
    name: number
    partnerType: number
    taxCode: number
    phone: number
    email: number
    address: number
    paymentTermDays: number
    creditLimit: number
    isActive: number
    debtReminderOn: number
    reminderEmail: number
    reminderCcEmails: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PartnerAvgAggregateInputType = {
    paymentTermDays?: true
    creditLimit?: true
  }

  export type PartnerSumAggregateInputType = {
    paymentTermDays?: true
    creditLimit?: true
  }

  export type PartnerMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    partnerType?: true
    taxCode?: true
    phone?: true
    email?: true
    address?: true
    paymentTermDays?: true
    creditLimit?: true
    isActive?: true
    debtReminderOn?: true
    reminderEmail?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartnerMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    partnerType?: true
    taxCode?: true
    phone?: true
    email?: true
    address?: true
    paymentTermDays?: true
    creditLimit?: true
    isActive?: true
    debtReminderOn?: true
    reminderEmail?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PartnerCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    partnerType?: true
    taxCode?: true
    phone?: true
    email?: true
    address?: true
    paymentTermDays?: true
    creditLimit?: true
    isActive?: true
    debtReminderOn?: true
    reminderEmail?: true
    reminderCcEmails?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PartnerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Partner to aggregate.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Partners
    **/
    _count?: true | PartnerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PartnerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PartnerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartnerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartnerMaxAggregateInputType
  }

  export type GetPartnerAggregateType<T extends PartnerAggregateArgs> = {
        [P in keyof T & keyof AggregatePartner]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePartner[P]>
      : GetScalarType<T[P], AggregatePartner[P]>
  }




  export type PartnerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartnerWhereInput
    orderBy?: PartnerOrderByWithAggregationInput | PartnerOrderByWithAggregationInput[]
    by: PartnerScalarFieldEnum[] | PartnerScalarFieldEnum
    having?: PartnerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartnerCountAggregateInputType | true
    _avg?: PartnerAvgAggregateInputType
    _sum?: PartnerSumAggregateInputType
    _min?: PartnerMinAggregateInputType
    _max?: PartnerMaxAggregateInputType
  }

  export type PartnerGroupByOutputType = {
    id: string
    code: string
    name: string
    partnerType: $Enums.PartnerType
    taxCode: string | null
    phone: string | null
    email: string | null
    address: string | null
    paymentTermDays: number | null
    creditLimit: Decimal | null
    isActive: boolean
    debtReminderOn: boolean
    reminderEmail: string | null
    reminderCcEmails: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: PartnerCountAggregateOutputType | null
    _avg: PartnerAvgAggregateOutputType | null
    _sum: PartnerSumAggregateOutputType | null
    _min: PartnerMinAggregateOutputType | null
    _max: PartnerMaxAggregateOutputType | null
  }

  type GetPartnerGroupByPayload<T extends PartnerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartnerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartnerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartnerGroupByOutputType[P]>
            : GetScalarType<T[P], PartnerGroupByOutputType[P]>
        }
      >
    >


  export type PartnerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    partnerType?: boolean
    taxCode?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    paymentTermDays?: boolean
    creditLimit?: boolean
    isActive?: boolean
    debtReminderOn?: boolean
    reminderEmail?: boolean
    reminderCcEmails?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    debtReminders?: boolean | Partner$debtRemindersArgs<ExtArgs>
    debtReminderLogs?: boolean | Partner$debtReminderLogsArgs<ExtArgs>
    _count?: boolean | PartnerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["partner"]>

  export type PartnerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    partnerType?: boolean
    taxCode?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    paymentTermDays?: boolean
    creditLimit?: boolean
    isActive?: boolean
    debtReminderOn?: boolean
    reminderEmail?: boolean
    reminderCcEmails?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["partner"]>

  export type PartnerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    partnerType?: boolean
    taxCode?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    paymentTermDays?: boolean
    creditLimit?: boolean
    isActive?: boolean
    debtReminderOn?: boolean
    reminderEmail?: boolean
    reminderCcEmails?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["partner"]>

  export type PartnerSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    partnerType?: boolean
    taxCode?: boolean
    phone?: boolean
    email?: boolean
    address?: boolean
    paymentTermDays?: boolean
    creditLimit?: boolean
    isActive?: boolean
    debtReminderOn?: boolean
    reminderEmail?: boolean
    reminderCcEmails?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PartnerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "partnerType" | "taxCode" | "phone" | "email" | "address" | "paymentTermDays" | "creditLimit" | "isActive" | "debtReminderOn" | "reminderEmail" | "reminderCcEmails" | "createdAt" | "updatedAt", ExtArgs["result"]["partner"]>
  export type PartnerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    debtReminders?: boolean | Partner$debtRemindersArgs<ExtArgs>
    debtReminderLogs?: boolean | Partner$debtReminderLogsArgs<ExtArgs>
    _count?: boolean | PartnerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PartnerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PartnerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PartnerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Partner"
    objects: {
      debtReminders: Prisma.$DebtReminderConfigPayload<ExtArgs>[]
      debtReminderLogs: Prisma.$DebtReminderLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name: string
      partnerType: $Enums.PartnerType
      taxCode: string | null
      phone: string | null
      email: string | null
      address: string | null
      paymentTermDays: number | null
      creditLimit: Prisma.Decimal | null
      isActive: boolean
      debtReminderOn: boolean
      reminderEmail: string | null
      reminderCcEmails: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["partner"]>
    composites: {}
  }

  type PartnerGetPayload<S extends boolean | null | undefined | PartnerDefaultArgs> = $Result.GetResult<Prisma.$PartnerPayload, S>

  type PartnerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PartnerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PartnerCountAggregateInputType | true
    }

  export interface PartnerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Partner'], meta: { name: 'Partner' } }
    /**
     * Find zero or one Partner that matches the filter.
     * @param {PartnerFindUniqueArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PartnerFindUniqueArgs>(args: SelectSubset<T, PartnerFindUniqueArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Partner that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PartnerFindUniqueOrThrowArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PartnerFindUniqueOrThrowArgs>(args: SelectSubset<T, PartnerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Partner that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerFindFirstArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PartnerFindFirstArgs>(args?: SelectSubset<T, PartnerFindFirstArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Partner that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerFindFirstOrThrowArgs} args - Arguments to find a Partner
     * @example
     * // Get one Partner
     * const partner = await prisma.partner.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PartnerFindFirstOrThrowArgs>(args?: SelectSubset<T, PartnerFindFirstOrThrowArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Partners that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Partners
     * const partners = await prisma.partner.findMany()
     * 
     * // Get first 10 Partners
     * const partners = await prisma.partner.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partnerWithIdOnly = await prisma.partner.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PartnerFindManyArgs>(args?: SelectSubset<T, PartnerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Partner.
     * @param {PartnerCreateArgs} args - Arguments to create a Partner.
     * @example
     * // Create one Partner
     * const Partner = await prisma.partner.create({
     *   data: {
     *     // ... data to create a Partner
     *   }
     * })
     * 
     */
    create<T extends PartnerCreateArgs>(args: SelectSubset<T, PartnerCreateArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Partners.
     * @param {PartnerCreateManyArgs} args - Arguments to create many Partners.
     * @example
     * // Create many Partners
     * const partner = await prisma.partner.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PartnerCreateManyArgs>(args?: SelectSubset<T, PartnerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Partners and returns the data saved in the database.
     * @param {PartnerCreateManyAndReturnArgs} args - Arguments to create many Partners.
     * @example
     * // Create many Partners
     * const partner = await prisma.partner.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Partners and only return the `id`
     * const partnerWithIdOnly = await prisma.partner.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PartnerCreateManyAndReturnArgs>(args?: SelectSubset<T, PartnerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Partner.
     * @param {PartnerDeleteArgs} args - Arguments to delete one Partner.
     * @example
     * // Delete one Partner
     * const Partner = await prisma.partner.delete({
     *   where: {
     *     // ... filter to delete one Partner
     *   }
     * })
     * 
     */
    delete<T extends PartnerDeleteArgs>(args: SelectSubset<T, PartnerDeleteArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Partner.
     * @param {PartnerUpdateArgs} args - Arguments to update one Partner.
     * @example
     * // Update one Partner
     * const partner = await prisma.partner.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PartnerUpdateArgs>(args: SelectSubset<T, PartnerUpdateArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Partners.
     * @param {PartnerDeleteManyArgs} args - Arguments to filter Partners to delete.
     * @example
     * // Delete a few Partners
     * const { count } = await prisma.partner.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PartnerDeleteManyArgs>(args?: SelectSubset<T, PartnerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Partners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Partners
     * const partner = await prisma.partner.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PartnerUpdateManyArgs>(args: SelectSubset<T, PartnerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Partners and returns the data updated in the database.
     * @param {PartnerUpdateManyAndReturnArgs} args - Arguments to update many Partners.
     * @example
     * // Update many Partners
     * const partner = await prisma.partner.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Partners and only return the `id`
     * const partnerWithIdOnly = await prisma.partner.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PartnerUpdateManyAndReturnArgs>(args: SelectSubset<T, PartnerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Partner.
     * @param {PartnerUpsertArgs} args - Arguments to update or create a Partner.
     * @example
     * // Update or create a Partner
     * const partner = await prisma.partner.upsert({
     *   create: {
     *     // ... data to create a Partner
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Partner we want to update
     *   }
     * })
     */
    upsert<T extends PartnerUpsertArgs>(args: SelectSubset<T, PartnerUpsertArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Partners.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerCountArgs} args - Arguments to filter Partners to count.
     * @example
     * // Count the number of Partners
     * const count = await prisma.partner.count({
     *   where: {
     *     // ... the filter for the Partners we want to count
     *   }
     * })
    **/
    count<T extends PartnerCountArgs>(
      args?: Subset<T, PartnerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartnerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Partner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PartnerAggregateArgs>(args: Subset<T, PartnerAggregateArgs>): Prisma.PrismaPromise<GetPartnerAggregateType<T>>

    /**
     * Group by Partner.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartnerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PartnerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PartnerGroupByArgs['orderBy'] }
        : { orderBy?: PartnerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PartnerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartnerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Partner model
   */
  readonly fields: PartnerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Partner.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PartnerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    debtReminders<T extends Partner$debtRemindersArgs<ExtArgs> = {}>(args?: Subset<T, Partner$debtRemindersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DebtReminderConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    debtReminderLogs<T extends Partner$debtReminderLogsArgs<ExtArgs> = {}>(args?: Subset<T, Partner$debtReminderLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DebtReminderLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Partner model
   */
  interface PartnerFieldRefs {
    readonly id: FieldRef<"Partner", 'String'>
    readonly code: FieldRef<"Partner", 'String'>
    readonly name: FieldRef<"Partner", 'String'>
    readonly partnerType: FieldRef<"Partner", 'PartnerType'>
    readonly taxCode: FieldRef<"Partner", 'String'>
    readonly phone: FieldRef<"Partner", 'String'>
    readonly email: FieldRef<"Partner", 'String'>
    readonly address: FieldRef<"Partner", 'String'>
    readonly paymentTermDays: FieldRef<"Partner", 'Int'>
    readonly creditLimit: FieldRef<"Partner", 'Decimal'>
    readonly isActive: FieldRef<"Partner", 'Boolean'>
    readonly debtReminderOn: FieldRef<"Partner", 'Boolean'>
    readonly reminderEmail: FieldRef<"Partner", 'String'>
    readonly reminderCcEmails: FieldRef<"Partner", 'Json'>
    readonly createdAt: FieldRef<"Partner", 'DateTime'>
    readonly updatedAt: FieldRef<"Partner", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Partner findUnique
   */
  export type PartnerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner findUniqueOrThrow
   */
  export type PartnerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner findFirst
   */
  export type PartnerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Partners.
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Partners.
     */
    distinct?: PartnerScalarFieldEnum | PartnerScalarFieldEnum[]
  }

  /**
   * Partner findFirstOrThrow
   */
  export type PartnerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partner to fetch.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Partners.
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Partners.
     */
    distinct?: PartnerScalarFieldEnum | PartnerScalarFieldEnum[]
  }

  /**
   * Partner findMany
   */
  export type PartnerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter, which Partners to fetch.
     */
    where?: PartnerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Partners to fetch.
     */
    orderBy?: PartnerOrderByWithRelationInput | PartnerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Partners.
     */
    cursor?: PartnerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Partners from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Partners.
     */
    skip?: number
    distinct?: PartnerScalarFieldEnum | PartnerScalarFieldEnum[]
  }

  /**
   * Partner create
   */
  export type PartnerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * The data needed to create a Partner.
     */
    data: XOR<PartnerCreateInput, PartnerUncheckedCreateInput>
  }

  /**
   * Partner createMany
   */
  export type PartnerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Partners.
     */
    data: PartnerCreateManyInput | PartnerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Partner createManyAndReturn
   */
  export type PartnerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * The data used to create many Partners.
     */
    data: PartnerCreateManyInput | PartnerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Partner update
   */
  export type PartnerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * The data needed to update a Partner.
     */
    data: XOR<PartnerUpdateInput, PartnerUncheckedUpdateInput>
    /**
     * Choose, which Partner to update.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner updateMany
   */
  export type PartnerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Partners.
     */
    data: XOR<PartnerUpdateManyMutationInput, PartnerUncheckedUpdateManyInput>
    /**
     * Filter which Partners to update
     */
    where?: PartnerWhereInput
    /**
     * Limit how many Partners to update.
     */
    limit?: number
  }

  /**
   * Partner updateManyAndReturn
   */
  export type PartnerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * The data used to update Partners.
     */
    data: XOR<PartnerUpdateManyMutationInput, PartnerUncheckedUpdateManyInput>
    /**
     * Filter which Partners to update
     */
    where?: PartnerWhereInput
    /**
     * Limit how many Partners to update.
     */
    limit?: number
  }

  /**
   * Partner upsert
   */
  export type PartnerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * The filter to search for the Partner to update in case it exists.
     */
    where: PartnerWhereUniqueInput
    /**
     * In case the Partner found by the `where` argument doesn't exist, create a new Partner with this data.
     */
    create: XOR<PartnerCreateInput, PartnerUncheckedCreateInput>
    /**
     * In case the Partner was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PartnerUpdateInput, PartnerUncheckedUpdateInput>
  }

  /**
   * Partner delete
   */
  export type PartnerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
    /**
     * Filter which Partner to delete.
     */
    where: PartnerWhereUniqueInput
  }

  /**
   * Partner deleteMany
   */
  export type PartnerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Partners to delete
     */
    where?: PartnerWhereInput
    /**
     * Limit how many Partners to delete.
     */
    limit?: number
  }

  /**
   * Partner.debtReminders
   */
  export type Partner$debtRemindersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderConfig
     */
    select?: DebtReminderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderConfig
     */
    omit?: DebtReminderConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderConfigInclude<ExtArgs> | null
    where?: DebtReminderConfigWhereInput
    orderBy?: DebtReminderConfigOrderByWithRelationInput | DebtReminderConfigOrderByWithRelationInput[]
    cursor?: DebtReminderConfigWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DebtReminderConfigScalarFieldEnum | DebtReminderConfigScalarFieldEnum[]
  }

  /**
   * Partner.debtReminderLogs
   */
  export type Partner$debtReminderLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderLog
     */
    select?: DebtReminderLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderLog
     */
    omit?: DebtReminderLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderLogInclude<ExtArgs> | null
    where?: DebtReminderLogWhereInput
    orderBy?: DebtReminderLogOrderByWithRelationInput | DebtReminderLogOrderByWithRelationInput[]
    cursor?: DebtReminderLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DebtReminderLogScalarFieldEnum | DebtReminderLogScalarFieldEnum[]
  }

  /**
   * Partner without action
   */
  export type PartnerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Partner
     */
    select?: PartnerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Partner
     */
    omit?: PartnerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartnerInclude<ExtArgs> | null
  }


  /**
   * Model Account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountAvgAggregateOutputType = {
    level: number | null
    sortOrder: number | null
  }

  export type AccountSumAggregateOutputType = {
    level: number | null
    sortOrder: number | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    accountType: $Enums.AccountType | null
    normalBalance: $Enums.NormalBalance | null
    parentId: string | null
    level: number | null
    isPosting: boolean | null
    allowManualEntry: boolean | null
    isActive: boolean | null
    sortOrder: number | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    accountType: $Enums.AccountType | null
    normalBalance: $Enums.NormalBalance | null
    parentId: string | null
    level: number | null
    isPosting: boolean | null
    allowManualEntry: boolean | null
    isActive: boolean | null
    sortOrder: number | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    code: number
    name: number
    accountType: number
    normalBalance: number
    parentId: number
    level: number
    isPosting: number
    allowManualEntry: number
    isActive: number
    sortOrder: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountAvgAggregateInputType = {
    level?: true
    sortOrder?: true
  }

  export type AccountSumAggregateInputType = {
    level?: true
    sortOrder?: true
  }

  export type AccountMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    accountType?: true
    normalBalance?: true
    parentId?: true
    level?: true
    isPosting?: true
    allowManualEntry?: true
    isActive?: true
    sortOrder?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    accountType?: true
    normalBalance?: true
    parentId?: true
    level?: true
    isPosting?: true
    allowManualEntry?: true
    isActive?: true
    sortOrder?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    accountType?: true
    normalBalance?: true
    parentId?: true
    level?: true
    isPosting?: true
    allowManualEntry?: true
    isActive?: true
    sortOrder?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Account to aggregate.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type AccountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithAggregationInput | AccountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: AccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _avg?: AccountAvgAggregateInputType
    _sum?: AccountSumAggregateInputType
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    code: string
    name: string
    accountType: $Enums.AccountType
    normalBalance: $Enums.NormalBalance
    parentId: string | null
    level: number
    isPosting: boolean
    allowManualEntry: boolean
    isActive: boolean
    sortOrder: number
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _avg: AccountAvgAggregateOutputType | null
    _sum: AccountSumAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends AccountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type AccountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    accountType?: boolean
    normalBalance?: boolean
    parentId?: boolean
    level?: boolean
    isPosting?: boolean
    allowManualEntry?: boolean
    isActive?: boolean
    sortOrder?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parent?: boolean | Account$parentArgs<ExtArgs>
    children?: boolean | Account$childrenArgs<ExtArgs>
    revenueItems?: boolean | Account$revenueItemsArgs<ExtArgs>
    cogsItems?: boolean | Account$cogsItemsArgs<ExtArgs>
    inventoryItems?: boolean | Account$inventoryItemsArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    accountType?: boolean
    normalBalance?: boolean
    parentId?: boolean
    level?: boolean
    isPosting?: boolean
    allowManualEntry?: boolean
    isActive?: boolean
    sortOrder?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parent?: boolean | Account$parentArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    accountType?: boolean
    normalBalance?: boolean
    parentId?: boolean
    level?: boolean
    isPosting?: boolean
    allowManualEntry?: boolean
    isActive?: boolean
    sortOrder?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parent?: boolean | Account$parentArgs<ExtArgs>
  }, ExtArgs["result"]["account"]>

  export type AccountSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    accountType?: boolean
    normalBalance?: boolean
    parentId?: boolean
    level?: boolean
    isPosting?: boolean
    allowManualEntry?: boolean
    isActive?: boolean
    sortOrder?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AccountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "code" | "name" | "accountType" | "normalBalance" | "parentId" | "level" | "isPosting" | "allowManualEntry" | "isActive" | "sortOrder" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>
  export type AccountInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Account$parentArgs<ExtArgs>
    children?: boolean | Account$childrenArgs<ExtArgs>
    revenueItems?: boolean | Account$revenueItemsArgs<ExtArgs>
    cogsItems?: boolean | Account$cogsItemsArgs<ExtArgs>
    inventoryItems?: boolean | Account$inventoryItemsArgs<ExtArgs>
    _count?: boolean | AccountCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AccountIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Account$parentArgs<ExtArgs>
  }
  export type AccountIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | Account$parentArgs<ExtArgs>
  }

  export type $AccountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Account"
    objects: {
      parent: Prisma.$AccountPayload<ExtArgs> | null
      children: Prisma.$AccountPayload<ExtArgs>[]
      revenueItems: Prisma.$ItemPayload<ExtArgs>[]
      cogsItems: Prisma.$ItemPayload<ExtArgs>[]
      inventoryItems: Prisma.$ItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name: string
      accountType: $Enums.AccountType
      normalBalance: $Enums.NormalBalance
      parentId: string | null
      level: number
      isPosting: boolean
      allowManualEntry: boolean
      isActive: boolean
      sortOrder: number
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type AccountGetPayload<S extends boolean | null | undefined | AccountDefaultArgs> = $Result.GetResult<Prisma.$AccountPayload, S>

  type AccountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AccountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface AccountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Account'], meta: { name: 'Account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {AccountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AccountFindUniqueArgs>(args: SelectSubset<T, AccountFindUniqueArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AccountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AccountFindUniqueOrThrowArgs>(args: SelectSubset<T, AccountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AccountFindFirstArgs>(args?: SelectSubset<T, AccountFindFirstArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AccountFindFirstOrThrowArgs>(args?: SelectSubset<T, AccountFindFirstOrThrowArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AccountFindManyArgs>(args?: SelectSubset<T, AccountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {AccountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends AccountCreateArgs>(args: SelectSubset<T, AccountCreateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {AccountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AccountCreateManyArgs>(args?: SelectSubset<T, AccountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Accounts and returns the data saved in the database.
     * @param {AccountCreateManyAndReturnArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AccountCreateManyAndReturnArgs>(args?: SelectSubset<T, AccountCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Account.
     * @param {AccountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends AccountDeleteArgs>(args: SelectSubset<T, AccountDeleteArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {AccountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AccountUpdateArgs>(args: SelectSubset<T, AccountUpdateArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {AccountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AccountDeleteManyArgs>(args?: SelectSubset<T, AccountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AccountUpdateManyArgs>(args: SelectSubset<T, AccountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts and returns the data updated in the database.
     * @param {AccountUpdateManyAndReturnArgs} args - Arguments to update many Accounts.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Accounts and only return the `id`
     * const accountWithIdOnly = await prisma.account.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AccountUpdateManyAndReturnArgs>(args: SelectSubset<T, AccountUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Account.
     * @param {AccountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends AccountUpsertArgs>(args: SelectSubset<T, AccountUpsertArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends AccountCountArgs>(
      args?: Subset<T, AccountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountGroupByArgs['orderBy'] }
        : { orderBy?: AccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Account model
   */
  readonly fields: AccountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AccountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends Account$parentArgs<ExtArgs> = {}>(args?: Subset<T, Account$parentArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    children<T extends Account$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Account$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    revenueItems<T extends Account$revenueItemsArgs<ExtArgs> = {}>(args?: Subset<T, Account$revenueItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    cogsItems<T extends Account$cogsItemsArgs<ExtArgs> = {}>(args?: Subset<T, Account$cogsItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    inventoryItems<T extends Account$inventoryItemsArgs<ExtArgs> = {}>(args?: Subset<T, Account$inventoryItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Account model
   */
  interface AccountFieldRefs {
    readonly id: FieldRef<"Account", 'String'>
    readonly code: FieldRef<"Account", 'String'>
    readonly name: FieldRef<"Account", 'String'>
    readonly accountType: FieldRef<"Account", 'AccountType'>
    readonly normalBalance: FieldRef<"Account", 'NormalBalance'>
    readonly parentId: FieldRef<"Account", 'String'>
    readonly level: FieldRef<"Account", 'Int'>
    readonly isPosting: FieldRef<"Account", 'Boolean'>
    readonly allowManualEntry: FieldRef<"Account", 'Boolean'>
    readonly isActive: FieldRef<"Account", 'Boolean'>
    readonly sortOrder: FieldRef<"Account", 'Int'>
    readonly description: FieldRef<"Account", 'String'>
    readonly createdAt: FieldRef<"Account", 'DateTime'>
    readonly updatedAt: FieldRef<"Account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Account findUnique
   */
  export type AccountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findUniqueOrThrow
   */
  export type AccountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account findFirst
   */
  export type AccountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findFirstOrThrow
   */
  export type AccountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Account to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account findMany
   */
  export type AccountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter, which Accounts to fetch.
     */
    where?: AccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Accounts to fetch.
     */
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Accounts.
     */
    cursor?: AccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account create
   */
  export type AccountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to create a Account.
     */
    data: XOR<AccountCreateInput, AccountUncheckedCreateInput>
  }

  /**
   * Account createMany
   */
  export type AccountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Account createManyAndReturn
   */
  export type AccountCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to create many Accounts.
     */
    data: AccountCreateManyInput | AccountCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account update
   */
  export type AccountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The data needed to update a Account.
     */
    data: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
    /**
     * Choose, which Account to update.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account updateMany
   */
  export type AccountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
  }

  /**
   * Account updateManyAndReturn
   */
  export type AccountUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * The data used to update Accounts.
     */
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyInput>
    /**
     * Filter which Accounts to update
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Account upsert
   */
  export type AccountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * The filter to search for the Account to update in case it exists.
     */
    where: AccountWhereUniqueInput
    /**
     * In case the Account found by the `where` argument doesn't exist, create a new Account with this data.
     */
    create: XOR<AccountCreateInput, AccountUncheckedCreateInput>
    /**
     * In case the Account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AccountUpdateInput, AccountUncheckedUpdateInput>
  }

  /**
   * Account delete
   */
  export type AccountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    /**
     * Filter which Account to delete.
     */
    where: AccountWhereUniqueInput
  }

  /**
   * Account deleteMany
   */
  export type AccountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Accounts to delete
     */
    where?: AccountWhereInput
    /**
     * Limit how many Accounts to delete.
     */
    limit?: number
  }

  /**
   * Account.parent
   */
  export type Account$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
  }

  /**
   * Account.children
   */
  export type Account$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
    orderBy?: AccountOrderByWithRelationInput | AccountOrderByWithRelationInput[]
    cursor?: AccountWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * Account.revenueItems
   */
  export type Account$revenueItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    cursor?: ItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Account.cogsItems
   */
  export type Account$cogsItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    cursor?: ItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Account.inventoryItems
   */
  export type Account$inventoryItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    cursor?: ItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Account without action
   */
  export type AccountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
  }


  /**
   * Model Item
   */

  export type AggregateItem = {
    _count: ItemCountAggregateOutputType | null
    _avg: ItemAvgAggregateOutputType | null
    _sum: ItemSumAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  export type ItemAvgAggregateOutputType = {
    salePrice: Decimal | null
    purchasePrice: Decimal | null
    vatRate: Decimal | null
  }

  export type ItemSumAggregateOutputType = {
    salePrice: Decimal | null
    purchasePrice: Decimal | null
    vatRate: Decimal | null
  }

  export type ItemMinAggregateOutputType = {
    id: string | null
    sku: string | null
    name: string | null
    itemType: $Enums.ItemType | null
    unit: string | null
    salePrice: Decimal | null
    purchasePrice: Decimal | null
    vatRate: Decimal | null
    revenueAccountId: string | null
    cogsAccountId: string | null
    inventoryAccountId: string | null
    isTrackedInventory: boolean | null
    isActive: boolean | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ItemMaxAggregateOutputType = {
    id: string | null
    sku: string | null
    name: string | null
    itemType: $Enums.ItemType | null
    unit: string | null
    salePrice: Decimal | null
    purchasePrice: Decimal | null
    vatRate: Decimal | null
    revenueAccountId: string | null
    cogsAccountId: string | null
    inventoryAccountId: string | null
    isTrackedInventory: boolean | null
    isActive: boolean | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ItemCountAggregateOutputType = {
    id: number
    sku: number
    name: number
    itemType: number
    unit: number
    salePrice: number
    purchasePrice: number
    vatRate: number
    revenueAccountId: number
    cogsAccountId: number
    inventoryAccountId: number
    isTrackedInventory: number
    isActive: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ItemAvgAggregateInputType = {
    salePrice?: true
    purchasePrice?: true
    vatRate?: true
  }

  export type ItemSumAggregateInputType = {
    salePrice?: true
    purchasePrice?: true
    vatRate?: true
  }

  export type ItemMinAggregateInputType = {
    id?: true
    sku?: true
    name?: true
    itemType?: true
    unit?: true
    salePrice?: true
    purchasePrice?: true
    vatRate?: true
    revenueAccountId?: true
    cogsAccountId?: true
    inventoryAccountId?: true
    isTrackedInventory?: true
    isActive?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ItemMaxAggregateInputType = {
    id?: true
    sku?: true
    name?: true
    itemType?: true
    unit?: true
    salePrice?: true
    purchasePrice?: true
    vatRate?: true
    revenueAccountId?: true
    cogsAccountId?: true
    inventoryAccountId?: true
    isTrackedInventory?: true
    isActive?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ItemCountAggregateInputType = {
    id?: true
    sku?: true
    name?: true
    itemType?: true
    unit?: true
    salePrice?: true
    purchasePrice?: true
    vatRate?: true
    revenueAccountId?: true
    cogsAccountId?: true
    inventoryAccountId?: true
    isTrackedInventory?: true
    isActive?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Item to aggregate.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Items
    **/
    _count?: true | ItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ItemMaxAggregateInputType
  }

  export type GetItemAggregateType<T extends ItemAggregateArgs> = {
        [P in keyof T & keyof AggregateItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateItem[P]>
      : GetScalarType<T[P], AggregateItem[P]>
  }




  export type ItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ItemWhereInput
    orderBy?: ItemOrderByWithAggregationInput | ItemOrderByWithAggregationInput[]
    by: ItemScalarFieldEnum[] | ItemScalarFieldEnum
    having?: ItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ItemCountAggregateInputType | true
    _avg?: ItemAvgAggregateInputType
    _sum?: ItemSumAggregateInputType
    _min?: ItemMinAggregateInputType
    _max?: ItemMaxAggregateInputType
  }

  export type ItemGroupByOutputType = {
    id: string
    sku: string
    name: string
    itemType: $Enums.ItemType
    unit: string
    salePrice: Decimal | null
    purchasePrice: Decimal | null
    vatRate: Decimal | null
    revenueAccountId: string | null
    cogsAccountId: string | null
    inventoryAccountId: string | null
    isTrackedInventory: boolean
    isActive: boolean
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: ItemCountAggregateOutputType | null
    _avg: ItemAvgAggregateOutputType | null
    _sum: ItemSumAggregateOutputType | null
    _min: ItemMinAggregateOutputType | null
    _max: ItemMaxAggregateOutputType | null
  }

  type GetItemGroupByPayload<T extends ItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ItemGroupByOutputType[P]>
            : GetScalarType<T[P], ItemGroupByOutputType[P]>
        }
      >
    >


  export type ItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sku?: boolean
    name?: boolean
    itemType?: boolean
    unit?: boolean
    salePrice?: boolean
    purchasePrice?: boolean
    vatRate?: boolean
    revenueAccountId?: boolean
    cogsAccountId?: boolean
    inventoryAccountId?: boolean
    isTrackedInventory?: boolean
    isActive?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    revenueAccount?: boolean | Item$revenueAccountArgs<ExtArgs>
    cogsAccount?: boolean | Item$cogsAccountArgs<ExtArgs>
    inventoryAccount?: boolean | Item$inventoryAccountArgs<ExtArgs>
  }, ExtArgs["result"]["item"]>

  export type ItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sku?: boolean
    name?: boolean
    itemType?: boolean
    unit?: boolean
    salePrice?: boolean
    purchasePrice?: boolean
    vatRate?: boolean
    revenueAccountId?: boolean
    cogsAccountId?: boolean
    inventoryAccountId?: boolean
    isTrackedInventory?: boolean
    isActive?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    revenueAccount?: boolean | Item$revenueAccountArgs<ExtArgs>
    cogsAccount?: boolean | Item$cogsAccountArgs<ExtArgs>
    inventoryAccount?: boolean | Item$inventoryAccountArgs<ExtArgs>
  }, ExtArgs["result"]["item"]>

  export type ItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sku?: boolean
    name?: boolean
    itemType?: boolean
    unit?: boolean
    salePrice?: boolean
    purchasePrice?: boolean
    vatRate?: boolean
    revenueAccountId?: boolean
    cogsAccountId?: boolean
    inventoryAccountId?: boolean
    isTrackedInventory?: boolean
    isActive?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    revenueAccount?: boolean | Item$revenueAccountArgs<ExtArgs>
    cogsAccount?: boolean | Item$cogsAccountArgs<ExtArgs>
    inventoryAccount?: boolean | Item$inventoryAccountArgs<ExtArgs>
  }, ExtArgs["result"]["item"]>

  export type ItemSelectScalar = {
    id?: boolean
    sku?: boolean
    name?: boolean
    itemType?: boolean
    unit?: boolean
    salePrice?: boolean
    purchasePrice?: boolean
    vatRate?: boolean
    revenueAccountId?: boolean
    cogsAccountId?: boolean
    inventoryAccountId?: boolean
    isTrackedInventory?: boolean
    isActive?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sku" | "name" | "itemType" | "unit" | "salePrice" | "purchasePrice" | "vatRate" | "revenueAccountId" | "cogsAccountId" | "inventoryAccountId" | "isTrackedInventory" | "isActive" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["item"]>
  export type ItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    revenueAccount?: boolean | Item$revenueAccountArgs<ExtArgs>
    cogsAccount?: boolean | Item$cogsAccountArgs<ExtArgs>
    inventoryAccount?: boolean | Item$inventoryAccountArgs<ExtArgs>
  }
  export type ItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    revenueAccount?: boolean | Item$revenueAccountArgs<ExtArgs>
    cogsAccount?: boolean | Item$cogsAccountArgs<ExtArgs>
    inventoryAccount?: boolean | Item$inventoryAccountArgs<ExtArgs>
  }
  export type ItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    revenueAccount?: boolean | Item$revenueAccountArgs<ExtArgs>
    cogsAccount?: boolean | Item$cogsAccountArgs<ExtArgs>
    inventoryAccount?: boolean | Item$inventoryAccountArgs<ExtArgs>
  }

  export type $ItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Item"
    objects: {
      revenueAccount: Prisma.$AccountPayload<ExtArgs> | null
      cogsAccount: Prisma.$AccountPayload<ExtArgs> | null
      inventoryAccount: Prisma.$AccountPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      sku: string
      name: string
      itemType: $Enums.ItemType
      unit: string
      salePrice: Prisma.Decimal | null
      purchasePrice: Prisma.Decimal | null
      vatRate: Prisma.Decimal | null
      revenueAccountId: string | null
      cogsAccountId: string | null
      inventoryAccountId: string | null
      isTrackedInventory: boolean
      isActive: boolean
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["item"]>
    composites: {}
  }

  type ItemGetPayload<S extends boolean | null | undefined | ItemDefaultArgs> = $Result.GetResult<Prisma.$ItemPayload, S>

  type ItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ItemCountAggregateInputType | true
    }

  export interface ItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Item'], meta: { name: 'Item' } }
    /**
     * Find zero or one Item that matches the filter.
     * @param {ItemFindUniqueArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ItemFindUniqueArgs>(args: SelectSubset<T, ItemFindUniqueArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Item that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ItemFindUniqueOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ItemFindUniqueOrThrowArgs>(args: SelectSubset<T, ItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindFirstArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ItemFindFirstArgs>(args?: SelectSubset<T, ItemFindFirstArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Item that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindFirstOrThrowArgs} args - Arguments to find a Item
     * @example
     * // Get one Item
     * const item = await prisma.item.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ItemFindFirstOrThrowArgs>(args?: SelectSubset<T, ItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Items that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Items
     * const items = await prisma.item.findMany()
     * 
     * // Get first 10 Items
     * const items = await prisma.item.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const itemWithIdOnly = await prisma.item.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ItemFindManyArgs>(args?: SelectSubset<T, ItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Item.
     * @param {ItemCreateArgs} args - Arguments to create a Item.
     * @example
     * // Create one Item
     * const Item = await prisma.item.create({
     *   data: {
     *     // ... data to create a Item
     *   }
     * })
     * 
     */
    create<T extends ItemCreateArgs>(args: SelectSubset<T, ItemCreateArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Items.
     * @param {ItemCreateManyArgs} args - Arguments to create many Items.
     * @example
     * // Create many Items
     * const item = await prisma.item.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ItemCreateManyArgs>(args?: SelectSubset<T, ItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Items and returns the data saved in the database.
     * @param {ItemCreateManyAndReturnArgs} args - Arguments to create many Items.
     * @example
     * // Create many Items
     * const item = await prisma.item.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Items and only return the `id`
     * const itemWithIdOnly = await prisma.item.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ItemCreateManyAndReturnArgs>(args?: SelectSubset<T, ItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Item.
     * @param {ItemDeleteArgs} args - Arguments to delete one Item.
     * @example
     * // Delete one Item
     * const Item = await prisma.item.delete({
     *   where: {
     *     // ... filter to delete one Item
     *   }
     * })
     * 
     */
    delete<T extends ItemDeleteArgs>(args: SelectSubset<T, ItemDeleteArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Item.
     * @param {ItemUpdateArgs} args - Arguments to update one Item.
     * @example
     * // Update one Item
     * const item = await prisma.item.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ItemUpdateArgs>(args: SelectSubset<T, ItemUpdateArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Items.
     * @param {ItemDeleteManyArgs} args - Arguments to filter Items to delete.
     * @example
     * // Delete a few Items
     * const { count } = await prisma.item.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ItemDeleteManyArgs>(args?: SelectSubset<T, ItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Items
     * const item = await prisma.item.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ItemUpdateManyArgs>(args: SelectSubset<T, ItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Items and returns the data updated in the database.
     * @param {ItemUpdateManyAndReturnArgs} args - Arguments to update many Items.
     * @example
     * // Update many Items
     * const item = await prisma.item.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Items and only return the `id`
     * const itemWithIdOnly = await prisma.item.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ItemUpdateManyAndReturnArgs>(args: SelectSubset<T, ItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Item.
     * @param {ItemUpsertArgs} args - Arguments to update or create a Item.
     * @example
     * // Update or create a Item
     * const item = await prisma.item.upsert({
     *   create: {
     *     // ... data to create a Item
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Item we want to update
     *   }
     * })
     */
    upsert<T extends ItemUpsertArgs>(args: SelectSubset<T, ItemUpsertArgs<ExtArgs>>): Prisma__ItemClient<$Result.GetResult<Prisma.$ItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Items.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemCountArgs} args - Arguments to filter Items to count.
     * @example
     * // Count the number of Items
     * const count = await prisma.item.count({
     *   where: {
     *     // ... the filter for the Items we want to count
     *   }
     * })
    **/
    count<T extends ItemCountArgs>(
      args?: Subset<T, ItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ItemAggregateArgs>(args: Subset<T, ItemAggregateArgs>): Prisma.PrismaPromise<GetItemAggregateType<T>>

    /**
     * Group by Item.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ItemGroupByArgs['orderBy'] }
        : { orderBy?: ItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Item model
   */
  readonly fields: ItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Item.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    revenueAccount<T extends Item$revenueAccountArgs<ExtArgs> = {}>(args?: Subset<T, Item$revenueAccountArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    cogsAccount<T extends Item$cogsAccountArgs<ExtArgs> = {}>(args?: Subset<T, Item$cogsAccountArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    inventoryAccount<T extends Item$inventoryAccountArgs<ExtArgs> = {}>(args?: Subset<T, Item$inventoryAccountArgs<ExtArgs>>): Prisma__AccountClient<$Result.GetResult<Prisma.$AccountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Item model
   */
  interface ItemFieldRefs {
    readonly id: FieldRef<"Item", 'String'>
    readonly sku: FieldRef<"Item", 'String'>
    readonly name: FieldRef<"Item", 'String'>
    readonly itemType: FieldRef<"Item", 'ItemType'>
    readonly unit: FieldRef<"Item", 'String'>
    readonly salePrice: FieldRef<"Item", 'Decimal'>
    readonly purchasePrice: FieldRef<"Item", 'Decimal'>
    readonly vatRate: FieldRef<"Item", 'Decimal'>
    readonly revenueAccountId: FieldRef<"Item", 'String'>
    readonly cogsAccountId: FieldRef<"Item", 'String'>
    readonly inventoryAccountId: FieldRef<"Item", 'String'>
    readonly isTrackedInventory: FieldRef<"Item", 'Boolean'>
    readonly isActive: FieldRef<"Item", 'Boolean'>
    readonly description: FieldRef<"Item", 'String'>
    readonly createdAt: FieldRef<"Item", 'DateTime'>
    readonly updatedAt: FieldRef<"Item", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Item findUnique
   */
  export type ItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item findUniqueOrThrow
   */
  export type ItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item findFirst
   */
  export type ItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item findFirstOrThrow
   */
  export type ItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Item to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Items.
     */
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item findMany
   */
  export type ItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter, which Items to fetch.
     */
    where?: ItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Items to fetch.
     */
    orderBy?: ItemOrderByWithRelationInput | ItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Items.
     */
    cursor?: ItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Items from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Items.
     */
    skip?: number
    distinct?: ItemScalarFieldEnum | ItemScalarFieldEnum[]
  }

  /**
   * Item create
   */
  export type ItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The data needed to create a Item.
     */
    data: XOR<ItemCreateInput, ItemUncheckedCreateInput>
  }

  /**
   * Item createMany
   */
  export type ItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Items.
     */
    data: ItemCreateManyInput | ItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Item createManyAndReturn
   */
  export type ItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * The data used to create many Items.
     */
    data: ItemCreateManyInput | ItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Item update
   */
  export type ItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The data needed to update a Item.
     */
    data: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>
    /**
     * Choose, which Item to update.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item updateMany
   */
  export type ItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Items.
     */
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyInput>
    /**
     * Filter which Items to update
     */
    where?: ItemWhereInput
    /**
     * Limit how many Items to update.
     */
    limit?: number
  }

  /**
   * Item updateManyAndReturn
   */
  export type ItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * The data used to update Items.
     */
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyInput>
    /**
     * Filter which Items to update
     */
    where?: ItemWhereInput
    /**
     * Limit how many Items to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Item upsert
   */
  export type ItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * The filter to search for the Item to update in case it exists.
     */
    where: ItemWhereUniqueInput
    /**
     * In case the Item found by the `where` argument doesn't exist, create a new Item with this data.
     */
    create: XOR<ItemCreateInput, ItemUncheckedCreateInput>
    /**
     * In case the Item was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ItemUpdateInput, ItemUncheckedUpdateInput>
  }

  /**
   * Item delete
   */
  export type ItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
    /**
     * Filter which Item to delete.
     */
    where: ItemWhereUniqueInput
  }

  /**
   * Item deleteMany
   */
  export type ItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Items to delete
     */
    where?: ItemWhereInput
    /**
     * Limit how many Items to delete.
     */
    limit?: number
  }

  /**
   * Item.revenueAccount
   */
  export type Item$revenueAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
  }

  /**
   * Item.cogsAccount
   */
  export type Item$cogsAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
  }

  /**
   * Item.inventoryAccount
   */
  export type Item$inventoryAccountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Account
     */
    select?: AccountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Account
     */
    omit?: AccountOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AccountInclude<ExtArgs> | null
    where?: AccountWhereInput
  }

  /**
   * Item without action
   */
  export type ItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Item
     */
    select?: ItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Item
     */
    omit?: ItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ItemInclude<ExtArgs> | null
  }


  /**
   * Model DebtReminderConfig
   */

  export type AggregateDebtReminderConfig = {
    _count: DebtReminderConfigCountAggregateOutputType | null
    _avg: DebtReminderConfigAvgAggregateOutputType | null
    _sum: DebtReminderConfigSumAggregateOutputType | null
    _min: DebtReminderConfigMinAggregateOutputType | null
    _max: DebtReminderConfigMaxAggregateOutputType | null
  }

  export type DebtReminderConfigAvgAggregateOutputType = {
    daysBeforeDue: number | null
    daysAfterDue: number | null
  }

  export type DebtReminderConfigSumAggregateOutputType = {
    daysBeforeDue: number | null
    daysAfterDue: number | null
  }

  export type DebtReminderConfigMinAggregateOutputType = {
    id: string | null
    partnerId: string | null
    scope: $Enums.ReminderScope | null
    enabled: boolean | null
    daysBeforeDue: number | null
    daysAfterDue: number | null
    recipientEmail: string | null
    lastSentAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DebtReminderConfigMaxAggregateOutputType = {
    id: string | null
    partnerId: string | null
    scope: $Enums.ReminderScope | null
    enabled: boolean | null
    daysBeforeDue: number | null
    daysAfterDue: number | null
    recipientEmail: string | null
    lastSentAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DebtReminderConfigCountAggregateOutputType = {
    id: number
    partnerId: number
    scope: number
    enabled: number
    daysBeforeDue: number
    daysAfterDue: number
    recipientEmail: number
    ccEmails: number
    lastSentAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DebtReminderConfigAvgAggregateInputType = {
    daysBeforeDue?: true
    daysAfterDue?: true
  }

  export type DebtReminderConfigSumAggregateInputType = {
    daysBeforeDue?: true
    daysAfterDue?: true
  }

  export type DebtReminderConfigMinAggregateInputType = {
    id?: true
    partnerId?: true
    scope?: true
    enabled?: true
    daysBeforeDue?: true
    daysAfterDue?: true
    recipientEmail?: true
    lastSentAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DebtReminderConfigMaxAggregateInputType = {
    id?: true
    partnerId?: true
    scope?: true
    enabled?: true
    daysBeforeDue?: true
    daysAfterDue?: true
    recipientEmail?: true
    lastSentAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DebtReminderConfigCountAggregateInputType = {
    id?: true
    partnerId?: true
    scope?: true
    enabled?: true
    daysBeforeDue?: true
    daysAfterDue?: true
    recipientEmail?: true
    ccEmails?: true
    lastSentAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DebtReminderConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DebtReminderConfig to aggregate.
     */
    where?: DebtReminderConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DebtReminderConfigs to fetch.
     */
    orderBy?: DebtReminderConfigOrderByWithRelationInput | DebtReminderConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DebtReminderConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DebtReminderConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DebtReminderConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DebtReminderConfigs
    **/
    _count?: true | DebtReminderConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DebtReminderConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DebtReminderConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DebtReminderConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DebtReminderConfigMaxAggregateInputType
  }

  export type GetDebtReminderConfigAggregateType<T extends DebtReminderConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateDebtReminderConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDebtReminderConfig[P]>
      : GetScalarType<T[P], AggregateDebtReminderConfig[P]>
  }




  export type DebtReminderConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DebtReminderConfigWhereInput
    orderBy?: DebtReminderConfigOrderByWithAggregationInput | DebtReminderConfigOrderByWithAggregationInput[]
    by: DebtReminderConfigScalarFieldEnum[] | DebtReminderConfigScalarFieldEnum
    having?: DebtReminderConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DebtReminderConfigCountAggregateInputType | true
    _avg?: DebtReminderConfigAvgAggregateInputType
    _sum?: DebtReminderConfigSumAggregateInputType
    _min?: DebtReminderConfigMinAggregateInputType
    _max?: DebtReminderConfigMaxAggregateInputType
  }

  export type DebtReminderConfigGroupByOutputType = {
    id: string
    partnerId: string
    scope: $Enums.ReminderScope
    enabled: boolean
    daysBeforeDue: number
    daysAfterDue: number
    recipientEmail: string | null
    ccEmails: JsonValue | null
    lastSentAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: DebtReminderConfigCountAggregateOutputType | null
    _avg: DebtReminderConfigAvgAggregateOutputType | null
    _sum: DebtReminderConfigSumAggregateOutputType | null
    _min: DebtReminderConfigMinAggregateOutputType | null
    _max: DebtReminderConfigMaxAggregateOutputType | null
  }

  type GetDebtReminderConfigGroupByPayload<T extends DebtReminderConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DebtReminderConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DebtReminderConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DebtReminderConfigGroupByOutputType[P]>
            : GetScalarType<T[P], DebtReminderConfigGroupByOutputType[P]>
        }
      >
    >


  export type DebtReminderConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    partnerId?: boolean
    scope?: boolean
    enabled?: boolean
    daysBeforeDue?: boolean
    daysAfterDue?: boolean
    recipientEmail?: boolean
    ccEmails?: boolean
    lastSentAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    partner?: boolean | PartnerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["debtReminderConfig"]>

  export type DebtReminderConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    partnerId?: boolean
    scope?: boolean
    enabled?: boolean
    daysBeforeDue?: boolean
    daysAfterDue?: boolean
    recipientEmail?: boolean
    ccEmails?: boolean
    lastSentAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    partner?: boolean | PartnerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["debtReminderConfig"]>

  export type DebtReminderConfigSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    partnerId?: boolean
    scope?: boolean
    enabled?: boolean
    daysBeforeDue?: boolean
    daysAfterDue?: boolean
    recipientEmail?: boolean
    ccEmails?: boolean
    lastSentAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    partner?: boolean | PartnerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["debtReminderConfig"]>

  export type DebtReminderConfigSelectScalar = {
    id?: boolean
    partnerId?: boolean
    scope?: boolean
    enabled?: boolean
    daysBeforeDue?: boolean
    daysAfterDue?: boolean
    recipientEmail?: boolean
    ccEmails?: boolean
    lastSentAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DebtReminderConfigOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "partnerId" | "scope" | "enabled" | "daysBeforeDue" | "daysAfterDue" | "recipientEmail" | "ccEmails" | "lastSentAt" | "createdAt" | "updatedAt", ExtArgs["result"]["debtReminderConfig"]>
  export type DebtReminderConfigInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    partner?: boolean | PartnerDefaultArgs<ExtArgs>
  }
  export type DebtReminderConfigIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    partner?: boolean | PartnerDefaultArgs<ExtArgs>
  }
  export type DebtReminderConfigIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    partner?: boolean | PartnerDefaultArgs<ExtArgs>
  }

  export type $DebtReminderConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DebtReminderConfig"
    objects: {
      partner: Prisma.$PartnerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      partnerId: string
      scope: $Enums.ReminderScope
      enabled: boolean
      daysBeforeDue: number
      daysAfterDue: number
      recipientEmail: string | null
      ccEmails: Prisma.JsonValue | null
      lastSentAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["debtReminderConfig"]>
    composites: {}
  }

  type DebtReminderConfigGetPayload<S extends boolean | null | undefined | DebtReminderConfigDefaultArgs> = $Result.GetResult<Prisma.$DebtReminderConfigPayload, S>

  type DebtReminderConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DebtReminderConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DebtReminderConfigCountAggregateInputType | true
    }

  export interface DebtReminderConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DebtReminderConfig'], meta: { name: 'DebtReminderConfig' } }
    /**
     * Find zero or one DebtReminderConfig that matches the filter.
     * @param {DebtReminderConfigFindUniqueArgs} args - Arguments to find a DebtReminderConfig
     * @example
     * // Get one DebtReminderConfig
     * const debtReminderConfig = await prisma.debtReminderConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DebtReminderConfigFindUniqueArgs>(args: SelectSubset<T, DebtReminderConfigFindUniqueArgs<ExtArgs>>): Prisma__DebtReminderConfigClient<$Result.GetResult<Prisma.$DebtReminderConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DebtReminderConfig that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DebtReminderConfigFindUniqueOrThrowArgs} args - Arguments to find a DebtReminderConfig
     * @example
     * // Get one DebtReminderConfig
     * const debtReminderConfig = await prisma.debtReminderConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DebtReminderConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, DebtReminderConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DebtReminderConfigClient<$Result.GetResult<Prisma.$DebtReminderConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DebtReminderConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtReminderConfigFindFirstArgs} args - Arguments to find a DebtReminderConfig
     * @example
     * // Get one DebtReminderConfig
     * const debtReminderConfig = await prisma.debtReminderConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DebtReminderConfigFindFirstArgs>(args?: SelectSubset<T, DebtReminderConfigFindFirstArgs<ExtArgs>>): Prisma__DebtReminderConfigClient<$Result.GetResult<Prisma.$DebtReminderConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DebtReminderConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtReminderConfigFindFirstOrThrowArgs} args - Arguments to find a DebtReminderConfig
     * @example
     * // Get one DebtReminderConfig
     * const debtReminderConfig = await prisma.debtReminderConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DebtReminderConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, DebtReminderConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__DebtReminderConfigClient<$Result.GetResult<Prisma.$DebtReminderConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DebtReminderConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtReminderConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DebtReminderConfigs
     * const debtReminderConfigs = await prisma.debtReminderConfig.findMany()
     * 
     * // Get first 10 DebtReminderConfigs
     * const debtReminderConfigs = await prisma.debtReminderConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const debtReminderConfigWithIdOnly = await prisma.debtReminderConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DebtReminderConfigFindManyArgs>(args?: SelectSubset<T, DebtReminderConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DebtReminderConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DebtReminderConfig.
     * @param {DebtReminderConfigCreateArgs} args - Arguments to create a DebtReminderConfig.
     * @example
     * // Create one DebtReminderConfig
     * const DebtReminderConfig = await prisma.debtReminderConfig.create({
     *   data: {
     *     // ... data to create a DebtReminderConfig
     *   }
     * })
     * 
     */
    create<T extends DebtReminderConfigCreateArgs>(args: SelectSubset<T, DebtReminderConfigCreateArgs<ExtArgs>>): Prisma__DebtReminderConfigClient<$Result.GetResult<Prisma.$DebtReminderConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DebtReminderConfigs.
     * @param {DebtReminderConfigCreateManyArgs} args - Arguments to create many DebtReminderConfigs.
     * @example
     * // Create many DebtReminderConfigs
     * const debtReminderConfig = await prisma.debtReminderConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DebtReminderConfigCreateManyArgs>(args?: SelectSubset<T, DebtReminderConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DebtReminderConfigs and returns the data saved in the database.
     * @param {DebtReminderConfigCreateManyAndReturnArgs} args - Arguments to create many DebtReminderConfigs.
     * @example
     * // Create many DebtReminderConfigs
     * const debtReminderConfig = await prisma.debtReminderConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DebtReminderConfigs and only return the `id`
     * const debtReminderConfigWithIdOnly = await prisma.debtReminderConfig.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DebtReminderConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, DebtReminderConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DebtReminderConfigPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DebtReminderConfig.
     * @param {DebtReminderConfigDeleteArgs} args - Arguments to delete one DebtReminderConfig.
     * @example
     * // Delete one DebtReminderConfig
     * const DebtReminderConfig = await prisma.debtReminderConfig.delete({
     *   where: {
     *     // ... filter to delete one DebtReminderConfig
     *   }
     * })
     * 
     */
    delete<T extends DebtReminderConfigDeleteArgs>(args: SelectSubset<T, DebtReminderConfigDeleteArgs<ExtArgs>>): Prisma__DebtReminderConfigClient<$Result.GetResult<Prisma.$DebtReminderConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DebtReminderConfig.
     * @param {DebtReminderConfigUpdateArgs} args - Arguments to update one DebtReminderConfig.
     * @example
     * // Update one DebtReminderConfig
     * const debtReminderConfig = await prisma.debtReminderConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DebtReminderConfigUpdateArgs>(args: SelectSubset<T, DebtReminderConfigUpdateArgs<ExtArgs>>): Prisma__DebtReminderConfigClient<$Result.GetResult<Prisma.$DebtReminderConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DebtReminderConfigs.
     * @param {DebtReminderConfigDeleteManyArgs} args - Arguments to filter DebtReminderConfigs to delete.
     * @example
     * // Delete a few DebtReminderConfigs
     * const { count } = await prisma.debtReminderConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DebtReminderConfigDeleteManyArgs>(args?: SelectSubset<T, DebtReminderConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DebtReminderConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtReminderConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DebtReminderConfigs
     * const debtReminderConfig = await prisma.debtReminderConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DebtReminderConfigUpdateManyArgs>(args: SelectSubset<T, DebtReminderConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DebtReminderConfigs and returns the data updated in the database.
     * @param {DebtReminderConfigUpdateManyAndReturnArgs} args - Arguments to update many DebtReminderConfigs.
     * @example
     * // Update many DebtReminderConfigs
     * const debtReminderConfig = await prisma.debtReminderConfig.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DebtReminderConfigs and only return the `id`
     * const debtReminderConfigWithIdOnly = await prisma.debtReminderConfig.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DebtReminderConfigUpdateManyAndReturnArgs>(args: SelectSubset<T, DebtReminderConfigUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DebtReminderConfigPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DebtReminderConfig.
     * @param {DebtReminderConfigUpsertArgs} args - Arguments to update or create a DebtReminderConfig.
     * @example
     * // Update or create a DebtReminderConfig
     * const debtReminderConfig = await prisma.debtReminderConfig.upsert({
     *   create: {
     *     // ... data to create a DebtReminderConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DebtReminderConfig we want to update
     *   }
     * })
     */
    upsert<T extends DebtReminderConfigUpsertArgs>(args: SelectSubset<T, DebtReminderConfigUpsertArgs<ExtArgs>>): Prisma__DebtReminderConfigClient<$Result.GetResult<Prisma.$DebtReminderConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DebtReminderConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtReminderConfigCountArgs} args - Arguments to filter DebtReminderConfigs to count.
     * @example
     * // Count the number of DebtReminderConfigs
     * const count = await prisma.debtReminderConfig.count({
     *   where: {
     *     // ... the filter for the DebtReminderConfigs we want to count
     *   }
     * })
    **/
    count<T extends DebtReminderConfigCountArgs>(
      args?: Subset<T, DebtReminderConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DebtReminderConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DebtReminderConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtReminderConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DebtReminderConfigAggregateArgs>(args: Subset<T, DebtReminderConfigAggregateArgs>): Prisma.PrismaPromise<GetDebtReminderConfigAggregateType<T>>

    /**
     * Group by DebtReminderConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtReminderConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DebtReminderConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DebtReminderConfigGroupByArgs['orderBy'] }
        : { orderBy?: DebtReminderConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DebtReminderConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDebtReminderConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DebtReminderConfig model
   */
  readonly fields: DebtReminderConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DebtReminderConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DebtReminderConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    partner<T extends PartnerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PartnerDefaultArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DebtReminderConfig model
   */
  interface DebtReminderConfigFieldRefs {
    readonly id: FieldRef<"DebtReminderConfig", 'String'>
    readonly partnerId: FieldRef<"DebtReminderConfig", 'String'>
    readonly scope: FieldRef<"DebtReminderConfig", 'ReminderScope'>
    readonly enabled: FieldRef<"DebtReminderConfig", 'Boolean'>
    readonly daysBeforeDue: FieldRef<"DebtReminderConfig", 'Int'>
    readonly daysAfterDue: FieldRef<"DebtReminderConfig", 'Int'>
    readonly recipientEmail: FieldRef<"DebtReminderConfig", 'String'>
    readonly ccEmails: FieldRef<"DebtReminderConfig", 'Json'>
    readonly lastSentAt: FieldRef<"DebtReminderConfig", 'DateTime'>
    readonly createdAt: FieldRef<"DebtReminderConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"DebtReminderConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DebtReminderConfig findUnique
   */
  export type DebtReminderConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderConfig
     */
    select?: DebtReminderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderConfig
     */
    omit?: DebtReminderConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderConfigInclude<ExtArgs> | null
    /**
     * Filter, which DebtReminderConfig to fetch.
     */
    where: DebtReminderConfigWhereUniqueInput
  }

  /**
   * DebtReminderConfig findUniqueOrThrow
   */
  export type DebtReminderConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderConfig
     */
    select?: DebtReminderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderConfig
     */
    omit?: DebtReminderConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderConfigInclude<ExtArgs> | null
    /**
     * Filter, which DebtReminderConfig to fetch.
     */
    where: DebtReminderConfigWhereUniqueInput
  }

  /**
   * DebtReminderConfig findFirst
   */
  export type DebtReminderConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderConfig
     */
    select?: DebtReminderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderConfig
     */
    omit?: DebtReminderConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderConfigInclude<ExtArgs> | null
    /**
     * Filter, which DebtReminderConfig to fetch.
     */
    where?: DebtReminderConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DebtReminderConfigs to fetch.
     */
    orderBy?: DebtReminderConfigOrderByWithRelationInput | DebtReminderConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DebtReminderConfigs.
     */
    cursor?: DebtReminderConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DebtReminderConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DebtReminderConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DebtReminderConfigs.
     */
    distinct?: DebtReminderConfigScalarFieldEnum | DebtReminderConfigScalarFieldEnum[]
  }

  /**
   * DebtReminderConfig findFirstOrThrow
   */
  export type DebtReminderConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderConfig
     */
    select?: DebtReminderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderConfig
     */
    omit?: DebtReminderConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderConfigInclude<ExtArgs> | null
    /**
     * Filter, which DebtReminderConfig to fetch.
     */
    where?: DebtReminderConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DebtReminderConfigs to fetch.
     */
    orderBy?: DebtReminderConfigOrderByWithRelationInput | DebtReminderConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DebtReminderConfigs.
     */
    cursor?: DebtReminderConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DebtReminderConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DebtReminderConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DebtReminderConfigs.
     */
    distinct?: DebtReminderConfigScalarFieldEnum | DebtReminderConfigScalarFieldEnum[]
  }

  /**
   * DebtReminderConfig findMany
   */
  export type DebtReminderConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderConfig
     */
    select?: DebtReminderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderConfig
     */
    omit?: DebtReminderConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderConfigInclude<ExtArgs> | null
    /**
     * Filter, which DebtReminderConfigs to fetch.
     */
    where?: DebtReminderConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DebtReminderConfigs to fetch.
     */
    orderBy?: DebtReminderConfigOrderByWithRelationInput | DebtReminderConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DebtReminderConfigs.
     */
    cursor?: DebtReminderConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DebtReminderConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DebtReminderConfigs.
     */
    skip?: number
    distinct?: DebtReminderConfigScalarFieldEnum | DebtReminderConfigScalarFieldEnum[]
  }

  /**
   * DebtReminderConfig create
   */
  export type DebtReminderConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderConfig
     */
    select?: DebtReminderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderConfig
     */
    omit?: DebtReminderConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderConfigInclude<ExtArgs> | null
    /**
     * The data needed to create a DebtReminderConfig.
     */
    data: XOR<DebtReminderConfigCreateInput, DebtReminderConfigUncheckedCreateInput>
  }

  /**
   * DebtReminderConfig createMany
   */
  export type DebtReminderConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DebtReminderConfigs.
     */
    data: DebtReminderConfigCreateManyInput | DebtReminderConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DebtReminderConfig createManyAndReturn
   */
  export type DebtReminderConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderConfig
     */
    select?: DebtReminderConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderConfig
     */
    omit?: DebtReminderConfigOmit<ExtArgs> | null
    /**
     * The data used to create many DebtReminderConfigs.
     */
    data: DebtReminderConfigCreateManyInput | DebtReminderConfigCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderConfigIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DebtReminderConfig update
   */
  export type DebtReminderConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderConfig
     */
    select?: DebtReminderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderConfig
     */
    omit?: DebtReminderConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderConfigInclude<ExtArgs> | null
    /**
     * The data needed to update a DebtReminderConfig.
     */
    data: XOR<DebtReminderConfigUpdateInput, DebtReminderConfigUncheckedUpdateInput>
    /**
     * Choose, which DebtReminderConfig to update.
     */
    where: DebtReminderConfigWhereUniqueInput
  }

  /**
   * DebtReminderConfig updateMany
   */
  export type DebtReminderConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DebtReminderConfigs.
     */
    data: XOR<DebtReminderConfigUpdateManyMutationInput, DebtReminderConfigUncheckedUpdateManyInput>
    /**
     * Filter which DebtReminderConfigs to update
     */
    where?: DebtReminderConfigWhereInput
    /**
     * Limit how many DebtReminderConfigs to update.
     */
    limit?: number
  }

  /**
   * DebtReminderConfig updateManyAndReturn
   */
  export type DebtReminderConfigUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderConfig
     */
    select?: DebtReminderConfigSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderConfig
     */
    omit?: DebtReminderConfigOmit<ExtArgs> | null
    /**
     * The data used to update DebtReminderConfigs.
     */
    data: XOR<DebtReminderConfigUpdateManyMutationInput, DebtReminderConfigUncheckedUpdateManyInput>
    /**
     * Filter which DebtReminderConfigs to update
     */
    where?: DebtReminderConfigWhereInput
    /**
     * Limit how many DebtReminderConfigs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderConfigIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DebtReminderConfig upsert
   */
  export type DebtReminderConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderConfig
     */
    select?: DebtReminderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderConfig
     */
    omit?: DebtReminderConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderConfigInclude<ExtArgs> | null
    /**
     * The filter to search for the DebtReminderConfig to update in case it exists.
     */
    where: DebtReminderConfigWhereUniqueInput
    /**
     * In case the DebtReminderConfig found by the `where` argument doesn't exist, create a new DebtReminderConfig with this data.
     */
    create: XOR<DebtReminderConfigCreateInput, DebtReminderConfigUncheckedCreateInput>
    /**
     * In case the DebtReminderConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DebtReminderConfigUpdateInput, DebtReminderConfigUncheckedUpdateInput>
  }

  /**
   * DebtReminderConfig delete
   */
  export type DebtReminderConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderConfig
     */
    select?: DebtReminderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderConfig
     */
    omit?: DebtReminderConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderConfigInclude<ExtArgs> | null
    /**
     * Filter which DebtReminderConfig to delete.
     */
    where: DebtReminderConfigWhereUniqueInput
  }

  /**
   * DebtReminderConfig deleteMany
   */
  export type DebtReminderConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DebtReminderConfigs to delete
     */
    where?: DebtReminderConfigWhereInput
    /**
     * Limit how many DebtReminderConfigs to delete.
     */
    limit?: number
  }

  /**
   * DebtReminderConfig without action
   */
  export type DebtReminderConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderConfig
     */
    select?: DebtReminderConfigSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderConfig
     */
    omit?: DebtReminderConfigOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderConfigInclude<ExtArgs> | null
  }


  /**
   * Model DebtReminderLog
   */

  export type AggregateDebtReminderLog = {
    _count: DebtReminderLogCountAggregateOutputType | null
    _avg: DebtReminderLogAvgAggregateOutputType | null
    _sum: DebtReminderLogSumAggregateOutputType | null
    _min: DebtReminderLogMinAggregateOutputType | null
    _max: DebtReminderLogMaxAggregateOutputType | null
  }

  export type DebtReminderLogAvgAggregateOutputType = {
    id: number | null
  }

  export type DebtReminderLogSumAggregateOutputType = {
    id: bigint | null
  }

  export type DebtReminderLogMinAggregateOutputType = {
    id: bigint | null
    partnerId: string | null
    scope: $Enums.ReminderScope | null
    invoiceRef: string | null
    recipientEmail: string | null
    subject: string | null
    status: $Enums.ReminderStatus | null
    errorMessage: string | null
    scheduledAt: Date | null
    sentAt: Date | null
    createdAt: Date | null
  }

  export type DebtReminderLogMaxAggregateOutputType = {
    id: bigint | null
    partnerId: string | null
    scope: $Enums.ReminderScope | null
    invoiceRef: string | null
    recipientEmail: string | null
    subject: string | null
    status: $Enums.ReminderStatus | null
    errorMessage: string | null
    scheduledAt: Date | null
    sentAt: Date | null
    createdAt: Date | null
  }

  export type DebtReminderLogCountAggregateOutputType = {
    id: number
    partnerId: number
    scope: number
    invoiceRef: number
    recipientEmail: number
    subject: number
    status: number
    errorMessage: number
    scheduledAt: number
    sentAt: number
    createdAt: number
    _all: number
  }


  export type DebtReminderLogAvgAggregateInputType = {
    id?: true
  }

  export type DebtReminderLogSumAggregateInputType = {
    id?: true
  }

  export type DebtReminderLogMinAggregateInputType = {
    id?: true
    partnerId?: true
    scope?: true
    invoiceRef?: true
    recipientEmail?: true
    subject?: true
    status?: true
    errorMessage?: true
    scheduledAt?: true
    sentAt?: true
    createdAt?: true
  }

  export type DebtReminderLogMaxAggregateInputType = {
    id?: true
    partnerId?: true
    scope?: true
    invoiceRef?: true
    recipientEmail?: true
    subject?: true
    status?: true
    errorMessage?: true
    scheduledAt?: true
    sentAt?: true
    createdAt?: true
  }

  export type DebtReminderLogCountAggregateInputType = {
    id?: true
    partnerId?: true
    scope?: true
    invoiceRef?: true
    recipientEmail?: true
    subject?: true
    status?: true
    errorMessage?: true
    scheduledAt?: true
    sentAt?: true
    createdAt?: true
    _all?: true
  }

  export type DebtReminderLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DebtReminderLog to aggregate.
     */
    where?: DebtReminderLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DebtReminderLogs to fetch.
     */
    orderBy?: DebtReminderLogOrderByWithRelationInput | DebtReminderLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DebtReminderLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DebtReminderLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DebtReminderLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DebtReminderLogs
    **/
    _count?: true | DebtReminderLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DebtReminderLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DebtReminderLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DebtReminderLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DebtReminderLogMaxAggregateInputType
  }

  export type GetDebtReminderLogAggregateType<T extends DebtReminderLogAggregateArgs> = {
        [P in keyof T & keyof AggregateDebtReminderLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDebtReminderLog[P]>
      : GetScalarType<T[P], AggregateDebtReminderLog[P]>
  }




  export type DebtReminderLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DebtReminderLogWhereInput
    orderBy?: DebtReminderLogOrderByWithAggregationInput | DebtReminderLogOrderByWithAggregationInput[]
    by: DebtReminderLogScalarFieldEnum[] | DebtReminderLogScalarFieldEnum
    having?: DebtReminderLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DebtReminderLogCountAggregateInputType | true
    _avg?: DebtReminderLogAvgAggregateInputType
    _sum?: DebtReminderLogSumAggregateInputType
    _min?: DebtReminderLogMinAggregateInputType
    _max?: DebtReminderLogMaxAggregateInputType
  }

  export type DebtReminderLogGroupByOutputType = {
    id: bigint
    partnerId: string
    scope: $Enums.ReminderScope
    invoiceRef: string | null
    recipientEmail: string
    subject: string
    status: $Enums.ReminderStatus
    errorMessage: string | null
    scheduledAt: Date
    sentAt: Date | null
    createdAt: Date
    _count: DebtReminderLogCountAggregateOutputType | null
    _avg: DebtReminderLogAvgAggregateOutputType | null
    _sum: DebtReminderLogSumAggregateOutputType | null
    _min: DebtReminderLogMinAggregateOutputType | null
    _max: DebtReminderLogMaxAggregateOutputType | null
  }

  type GetDebtReminderLogGroupByPayload<T extends DebtReminderLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DebtReminderLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DebtReminderLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DebtReminderLogGroupByOutputType[P]>
            : GetScalarType<T[P], DebtReminderLogGroupByOutputType[P]>
        }
      >
    >


  export type DebtReminderLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    partnerId?: boolean
    scope?: boolean
    invoiceRef?: boolean
    recipientEmail?: boolean
    subject?: boolean
    status?: boolean
    errorMessage?: boolean
    scheduledAt?: boolean
    sentAt?: boolean
    createdAt?: boolean
    partner?: boolean | PartnerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["debtReminderLog"]>

  export type DebtReminderLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    partnerId?: boolean
    scope?: boolean
    invoiceRef?: boolean
    recipientEmail?: boolean
    subject?: boolean
    status?: boolean
    errorMessage?: boolean
    scheduledAt?: boolean
    sentAt?: boolean
    createdAt?: boolean
    partner?: boolean | PartnerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["debtReminderLog"]>

  export type DebtReminderLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    partnerId?: boolean
    scope?: boolean
    invoiceRef?: boolean
    recipientEmail?: boolean
    subject?: boolean
    status?: boolean
    errorMessage?: boolean
    scheduledAt?: boolean
    sentAt?: boolean
    createdAt?: boolean
    partner?: boolean | PartnerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["debtReminderLog"]>

  export type DebtReminderLogSelectScalar = {
    id?: boolean
    partnerId?: boolean
    scope?: boolean
    invoiceRef?: boolean
    recipientEmail?: boolean
    subject?: boolean
    status?: boolean
    errorMessage?: boolean
    scheduledAt?: boolean
    sentAt?: boolean
    createdAt?: boolean
  }

  export type DebtReminderLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "partnerId" | "scope" | "invoiceRef" | "recipientEmail" | "subject" | "status" | "errorMessage" | "scheduledAt" | "sentAt" | "createdAt", ExtArgs["result"]["debtReminderLog"]>
  export type DebtReminderLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    partner?: boolean | PartnerDefaultArgs<ExtArgs>
  }
  export type DebtReminderLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    partner?: boolean | PartnerDefaultArgs<ExtArgs>
  }
  export type DebtReminderLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    partner?: boolean | PartnerDefaultArgs<ExtArgs>
  }

  export type $DebtReminderLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DebtReminderLog"
    objects: {
      partner: Prisma.$PartnerPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: bigint
      partnerId: string
      scope: $Enums.ReminderScope
      invoiceRef: string | null
      recipientEmail: string
      subject: string
      status: $Enums.ReminderStatus
      errorMessage: string | null
      scheduledAt: Date
      sentAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["debtReminderLog"]>
    composites: {}
  }

  type DebtReminderLogGetPayload<S extends boolean | null | undefined | DebtReminderLogDefaultArgs> = $Result.GetResult<Prisma.$DebtReminderLogPayload, S>

  type DebtReminderLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DebtReminderLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DebtReminderLogCountAggregateInputType | true
    }

  export interface DebtReminderLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DebtReminderLog'], meta: { name: 'DebtReminderLog' } }
    /**
     * Find zero or one DebtReminderLog that matches the filter.
     * @param {DebtReminderLogFindUniqueArgs} args - Arguments to find a DebtReminderLog
     * @example
     * // Get one DebtReminderLog
     * const debtReminderLog = await prisma.debtReminderLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DebtReminderLogFindUniqueArgs>(args: SelectSubset<T, DebtReminderLogFindUniqueArgs<ExtArgs>>): Prisma__DebtReminderLogClient<$Result.GetResult<Prisma.$DebtReminderLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DebtReminderLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DebtReminderLogFindUniqueOrThrowArgs} args - Arguments to find a DebtReminderLog
     * @example
     * // Get one DebtReminderLog
     * const debtReminderLog = await prisma.debtReminderLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DebtReminderLogFindUniqueOrThrowArgs>(args: SelectSubset<T, DebtReminderLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DebtReminderLogClient<$Result.GetResult<Prisma.$DebtReminderLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DebtReminderLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtReminderLogFindFirstArgs} args - Arguments to find a DebtReminderLog
     * @example
     * // Get one DebtReminderLog
     * const debtReminderLog = await prisma.debtReminderLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DebtReminderLogFindFirstArgs>(args?: SelectSubset<T, DebtReminderLogFindFirstArgs<ExtArgs>>): Prisma__DebtReminderLogClient<$Result.GetResult<Prisma.$DebtReminderLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DebtReminderLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtReminderLogFindFirstOrThrowArgs} args - Arguments to find a DebtReminderLog
     * @example
     * // Get one DebtReminderLog
     * const debtReminderLog = await prisma.debtReminderLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DebtReminderLogFindFirstOrThrowArgs>(args?: SelectSubset<T, DebtReminderLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__DebtReminderLogClient<$Result.GetResult<Prisma.$DebtReminderLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DebtReminderLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtReminderLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DebtReminderLogs
     * const debtReminderLogs = await prisma.debtReminderLog.findMany()
     * 
     * // Get first 10 DebtReminderLogs
     * const debtReminderLogs = await prisma.debtReminderLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const debtReminderLogWithIdOnly = await prisma.debtReminderLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DebtReminderLogFindManyArgs>(args?: SelectSubset<T, DebtReminderLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DebtReminderLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DebtReminderLog.
     * @param {DebtReminderLogCreateArgs} args - Arguments to create a DebtReminderLog.
     * @example
     * // Create one DebtReminderLog
     * const DebtReminderLog = await prisma.debtReminderLog.create({
     *   data: {
     *     // ... data to create a DebtReminderLog
     *   }
     * })
     * 
     */
    create<T extends DebtReminderLogCreateArgs>(args: SelectSubset<T, DebtReminderLogCreateArgs<ExtArgs>>): Prisma__DebtReminderLogClient<$Result.GetResult<Prisma.$DebtReminderLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DebtReminderLogs.
     * @param {DebtReminderLogCreateManyArgs} args - Arguments to create many DebtReminderLogs.
     * @example
     * // Create many DebtReminderLogs
     * const debtReminderLog = await prisma.debtReminderLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DebtReminderLogCreateManyArgs>(args?: SelectSubset<T, DebtReminderLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DebtReminderLogs and returns the data saved in the database.
     * @param {DebtReminderLogCreateManyAndReturnArgs} args - Arguments to create many DebtReminderLogs.
     * @example
     * // Create many DebtReminderLogs
     * const debtReminderLog = await prisma.debtReminderLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DebtReminderLogs and only return the `id`
     * const debtReminderLogWithIdOnly = await prisma.debtReminderLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DebtReminderLogCreateManyAndReturnArgs>(args?: SelectSubset<T, DebtReminderLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DebtReminderLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DebtReminderLog.
     * @param {DebtReminderLogDeleteArgs} args - Arguments to delete one DebtReminderLog.
     * @example
     * // Delete one DebtReminderLog
     * const DebtReminderLog = await prisma.debtReminderLog.delete({
     *   where: {
     *     // ... filter to delete one DebtReminderLog
     *   }
     * })
     * 
     */
    delete<T extends DebtReminderLogDeleteArgs>(args: SelectSubset<T, DebtReminderLogDeleteArgs<ExtArgs>>): Prisma__DebtReminderLogClient<$Result.GetResult<Prisma.$DebtReminderLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DebtReminderLog.
     * @param {DebtReminderLogUpdateArgs} args - Arguments to update one DebtReminderLog.
     * @example
     * // Update one DebtReminderLog
     * const debtReminderLog = await prisma.debtReminderLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DebtReminderLogUpdateArgs>(args: SelectSubset<T, DebtReminderLogUpdateArgs<ExtArgs>>): Prisma__DebtReminderLogClient<$Result.GetResult<Prisma.$DebtReminderLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DebtReminderLogs.
     * @param {DebtReminderLogDeleteManyArgs} args - Arguments to filter DebtReminderLogs to delete.
     * @example
     * // Delete a few DebtReminderLogs
     * const { count } = await prisma.debtReminderLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DebtReminderLogDeleteManyArgs>(args?: SelectSubset<T, DebtReminderLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DebtReminderLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtReminderLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DebtReminderLogs
     * const debtReminderLog = await prisma.debtReminderLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DebtReminderLogUpdateManyArgs>(args: SelectSubset<T, DebtReminderLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DebtReminderLogs and returns the data updated in the database.
     * @param {DebtReminderLogUpdateManyAndReturnArgs} args - Arguments to update many DebtReminderLogs.
     * @example
     * // Update many DebtReminderLogs
     * const debtReminderLog = await prisma.debtReminderLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DebtReminderLogs and only return the `id`
     * const debtReminderLogWithIdOnly = await prisma.debtReminderLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends DebtReminderLogUpdateManyAndReturnArgs>(args: SelectSubset<T, DebtReminderLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DebtReminderLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DebtReminderLog.
     * @param {DebtReminderLogUpsertArgs} args - Arguments to update or create a DebtReminderLog.
     * @example
     * // Update or create a DebtReminderLog
     * const debtReminderLog = await prisma.debtReminderLog.upsert({
     *   create: {
     *     // ... data to create a DebtReminderLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DebtReminderLog we want to update
     *   }
     * })
     */
    upsert<T extends DebtReminderLogUpsertArgs>(args: SelectSubset<T, DebtReminderLogUpsertArgs<ExtArgs>>): Prisma__DebtReminderLogClient<$Result.GetResult<Prisma.$DebtReminderLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DebtReminderLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtReminderLogCountArgs} args - Arguments to filter DebtReminderLogs to count.
     * @example
     * // Count the number of DebtReminderLogs
     * const count = await prisma.debtReminderLog.count({
     *   where: {
     *     // ... the filter for the DebtReminderLogs we want to count
     *   }
     * })
    **/
    count<T extends DebtReminderLogCountArgs>(
      args?: Subset<T, DebtReminderLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DebtReminderLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DebtReminderLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtReminderLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DebtReminderLogAggregateArgs>(args: Subset<T, DebtReminderLogAggregateArgs>): Prisma.PrismaPromise<GetDebtReminderLogAggregateType<T>>

    /**
     * Group by DebtReminderLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DebtReminderLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DebtReminderLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DebtReminderLogGroupByArgs['orderBy'] }
        : { orderBy?: DebtReminderLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DebtReminderLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDebtReminderLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DebtReminderLog model
   */
  readonly fields: DebtReminderLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DebtReminderLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DebtReminderLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    partner<T extends PartnerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PartnerDefaultArgs<ExtArgs>>): Prisma__PartnerClient<$Result.GetResult<Prisma.$PartnerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DebtReminderLog model
   */
  interface DebtReminderLogFieldRefs {
    readonly id: FieldRef<"DebtReminderLog", 'BigInt'>
    readonly partnerId: FieldRef<"DebtReminderLog", 'String'>
    readonly scope: FieldRef<"DebtReminderLog", 'ReminderScope'>
    readonly invoiceRef: FieldRef<"DebtReminderLog", 'String'>
    readonly recipientEmail: FieldRef<"DebtReminderLog", 'String'>
    readonly subject: FieldRef<"DebtReminderLog", 'String'>
    readonly status: FieldRef<"DebtReminderLog", 'ReminderStatus'>
    readonly errorMessage: FieldRef<"DebtReminderLog", 'String'>
    readonly scheduledAt: FieldRef<"DebtReminderLog", 'DateTime'>
    readonly sentAt: FieldRef<"DebtReminderLog", 'DateTime'>
    readonly createdAt: FieldRef<"DebtReminderLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DebtReminderLog findUnique
   */
  export type DebtReminderLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderLog
     */
    select?: DebtReminderLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderLog
     */
    omit?: DebtReminderLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderLogInclude<ExtArgs> | null
    /**
     * Filter, which DebtReminderLog to fetch.
     */
    where: DebtReminderLogWhereUniqueInput
  }

  /**
   * DebtReminderLog findUniqueOrThrow
   */
  export type DebtReminderLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderLog
     */
    select?: DebtReminderLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderLog
     */
    omit?: DebtReminderLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderLogInclude<ExtArgs> | null
    /**
     * Filter, which DebtReminderLog to fetch.
     */
    where: DebtReminderLogWhereUniqueInput
  }

  /**
   * DebtReminderLog findFirst
   */
  export type DebtReminderLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderLog
     */
    select?: DebtReminderLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderLog
     */
    omit?: DebtReminderLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderLogInclude<ExtArgs> | null
    /**
     * Filter, which DebtReminderLog to fetch.
     */
    where?: DebtReminderLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DebtReminderLogs to fetch.
     */
    orderBy?: DebtReminderLogOrderByWithRelationInput | DebtReminderLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DebtReminderLogs.
     */
    cursor?: DebtReminderLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DebtReminderLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DebtReminderLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DebtReminderLogs.
     */
    distinct?: DebtReminderLogScalarFieldEnum | DebtReminderLogScalarFieldEnum[]
  }

  /**
   * DebtReminderLog findFirstOrThrow
   */
  export type DebtReminderLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderLog
     */
    select?: DebtReminderLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderLog
     */
    omit?: DebtReminderLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderLogInclude<ExtArgs> | null
    /**
     * Filter, which DebtReminderLog to fetch.
     */
    where?: DebtReminderLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DebtReminderLogs to fetch.
     */
    orderBy?: DebtReminderLogOrderByWithRelationInput | DebtReminderLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DebtReminderLogs.
     */
    cursor?: DebtReminderLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DebtReminderLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DebtReminderLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DebtReminderLogs.
     */
    distinct?: DebtReminderLogScalarFieldEnum | DebtReminderLogScalarFieldEnum[]
  }

  /**
   * DebtReminderLog findMany
   */
  export type DebtReminderLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderLog
     */
    select?: DebtReminderLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderLog
     */
    omit?: DebtReminderLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderLogInclude<ExtArgs> | null
    /**
     * Filter, which DebtReminderLogs to fetch.
     */
    where?: DebtReminderLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DebtReminderLogs to fetch.
     */
    orderBy?: DebtReminderLogOrderByWithRelationInput | DebtReminderLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DebtReminderLogs.
     */
    cursor?: DebtReminderLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DebtReminderLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DebtReminderLogs.
     */
    skip?: number
    distinct?: DebtReminderLogScalarFieldEnum | DebtReminderLogScalarFieldEnum[]
  }

  /**
   * DebtReminderLog create
   */
  export type DebtReminderLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderLog
     */
    select?: DebtReminderLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderLog
     */
    omit?: DebtReminderLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderLogInclude<ExtArgs> | null
    /**
     * The data needed to create a DebtReminderLog.
     */
    data: XOR<DebtReminderLogCreateInput, DebtReminderLogUncheckedCreateInput>
  }

  /**
   * DebtReminderLog createMany
   */
  export type DebtReminderLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DebtReminderLogs.
     */
    data: DebtReminderLogCreateManyInput | DebtReminderLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DebtReminderLog createManyAndReturn
   */
  export type DebtReminderLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderLog
     */
    select?: DebtReminderLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderLog
     */
    omit?: DebtReminderLogOmit<ExtArgs> | null
    /**
     * The data used to create many DebtReminderLogs.
     */
    data: DebtReminderLogCreateManyInput | DebtReminderLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DebtReminderLog update
   */
  export type DebtReminderLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderLog
     */
    select?: DebtReminderLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderLog
     */
    omit?: DebtReminderLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderLogInclude<ExtArgs> | null
    /**
     * The data needed to update a DebtReminderLog.
     */
    data: XOR<DebtReminderLogUpdateInput, DebtReminderLogUncheckedUpdateInput>
    /**
     * Choose, which DebtReminderLog to update.
     */
    where: DebtReminderLogWhereUniqueInput
  }

  /**
   * DebtReminderLog updateMany
   */
  export type DebtReminderLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DebtReminderLogs.
     */
    data: XOR<DebtReminderLogUpdateManyMutationInput, DebtReminderLogUncheckedUpdateManyInput>
    /**
     * Filter which DebtReminderLogs to update
     */
    where?: DebtReminderLogWhereInput
    /**
     * Limit how many DebtReminderLogs to update.
     */
    limit?: number
  }

  /**
   * DebtReminderLog updateManyAndReturn
   */
  export type DebtReminderLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderLog
     */
    select?: DebtReminderLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderLog
     */
    omit?: DebtReminderLogOmit<ExtArgs> | null
    /**
     * The data used to update DebtReminderLogs.
     */
    data: XOR<DebtReminderLogUpdateManyMutationInput, DebtReminderLogUncheckedUpdateManyInput>
    /**
     * Filter which DebtReminderLogs to update
     */
    where?: DebtReminderLogWhereInput
    /**
     * Limit how many DebtReminderLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * DebtReminderLog upsert
   */
  export type DebtReminderLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderLog
     */
    select?: DebtReminderLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderLog
     */
    omit?: DebtReminderLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderLogInclude<ExtArgs> | null
    /**
     * The filter to search for the DebtReminderLog to update in case it exists.
     */
    where: DebtReminderLogWhereUniqueInput
    /**
     * In case the DebtReminderLog found by the `where` argument doesn't exist, create a new DebtReminderLog with this data.
     */
    create: XOR<DebtReminderLogCreateInput, DebtReminderLogUncheckedCreateInput>
    /**
     * In case the DebtReminderLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DebtReminderLogUpdateInput, DebtReminderLogUncheckedUpdateInput>
  }

  /**
   * DebtReminderLog delete
   */
  export type DebtReminderLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderLog
     */
    select?: DebtReminderLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderLog
     */
    omit?: DebtReminderLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderLogInclude<ExtArgs> | null
    /**
     * Filter which DebtReminderLog to delete.
     */
    where: DebtReminderLogWhereUniqueInput
  }

  /**
   * DebtReminderLog deleteMany
   */
  export type DebtReminderLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DebtReminderLogs to delete
     */
    where?: DebtReminderLogWhereInput
    /**
     * Limit how many DebtReminderLogs to delete.
     */
    limit?: number
  }

  /**
   * DebtReminderLog without action
   */
  export type DebtReminderLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DebtReminderLog
     */
    select?: DebtReminderLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DebtReminderLog
     */
    omit?: DebtReminderLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DebtReminderLogInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserProfileScalarFieldEnum: {
    id: 'id',
    email: 'email',
    fullName: 'fullName',
    role: 'role',
    provider: 'provider',
    avatarUrl: 'avatarUrl',
    isEmailVerified: 'isEmailVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserProfileScalarFieldEnum = (typeof UserProfileScalarFieldEnum)[keyof typeof UserProfileScalarFieldEnum]


  export const AuthAuditLogScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    email: 'email',
    action: 'action',
    success: 'success',
    message: 'message',
    provider: 'provider',
    role: 'role',
    ipAddress: 'ipAddress',
    createdAt: 'createdAt'
  };

  export type AuthAuditLogScalarFieldEnum = (typeof AuthAuditLogScalarFieldEnum)[keyof typeof AuthAuditLogScalarFieldEnum]


  export const PartnerScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    partnerType: 'partnerType',
    taxCode: 'taxCode',
    phone: 'phone',
    email: 'email',
    address: 'address',
    paymentTermDays: 'paymentTermDays',
    creditLimit: 'creditLimit',
    isActive: 'isActive',
    debtReminderOn: 'debtReminderOn',
    reminderEmail: 'reminderEmail',
    reminderCcEmails: 'reminderCcEmails',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PartnerScalarFieldEnum = (typeof PartnerScalarFieldEnum)[keyof typeof PartnerScalarFieldEnum]


  export const AccountScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    accountType: 'accountType',
    normalBalance: 'normalBalance',
    parentId: 'parentId',
    level: 'level',
    isPosting: 'isPosting',
    allowManualEntry: 'allowManualEntry',
    isActive: 'isActive',
    sortOrder: 'sortOrder',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const ItemScalarFieldEnum: {
    id: 'id',
    sku: 'sku',
    name: 'name',
    itemType: 'itemType',
    unit: 'unit',
    salePrice: 'salePrice',
    purchasePrice: 'purchasePrice',
    vatRate: 'vatRate',
    revenueAccountId: 'revenueAccountId',
    cogsAccountId: 'cogsAccountId',
    inventoryAccountId: 'inventoryAccountId',
    isTrackedInventory: 'isTrackedInventory',
    isActive: 'isActive',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ItemScalarFieldEnum = (typeof ItemScalarFieldEnum)[keyof typeof ItemScalarFieldEnum]


  export const DebtReminderConfigScalarFieldEnum: {
    id: 'id',
    partnerId: 'partnerId',
    scope: 'scope',
    enabled: 'enabled',
    daysBeforeDue: 'daysBeforeDue',
    daysAfterDue: 'daysAfterDue',
    recipientEmail: 'recipientEmail',
    ccEmails: 'ccEmails',
    lastSentAt: 'lastSentAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DebtReminderConfigScalarFieldEnum = (typeof DebtReminderConfigScalarFieldEnum)[keyof typeof DebtReminderConfigScalarFieldEnum]


  export const DebtReminderLogScalarFieldEnum: {
    id: 'id',
    partnerId: 'partnerId',
    scope: 'scope',
    invoiceRef: 'invoiceRef',
    recipientEmail: 'recipientEmail',
    subject: 'subject',
    status: 'status',
    errorMessage: 'errorMessage',
    scheduledAt: 'scheduledAt',
    sentAt: 'sentAt',
    createdAt: 'createdAt'
  };

  export type DebtReminderLogScalarFieldEnum = (typeof DebtReminderLogScalarFieldEnum)[keyof typeof DebtReminderLogScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'AuthUserRole'
   */
  export type EnumAuthUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthUserRole'>
    


  /**
   * Reference to a field of type 'AuthUserRole[]'
   */
  export type ListEnumAuthUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthUserRole[]'>
    


  /**
   * Reference to a field of type 'AuthProvider'
   */
  export type EnumAuthProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthProvider'>
    


  /**
   * Reference to a field of type 'AuthProvider[]'
   */
  export type ListEnumAuthProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthProvider[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'PartnerType'
   */
  export type EnumPartnerTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PartnerType'>
    


  /**
   * Reference to a field of type 'PartnerType[]'
   */
  export type ListEnumPartnerTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PartnerType[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'AccountType'
   */
  export type EnumAccountTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountType'>
    


  /**
   * Reference to a field of type 'AccountType[]'
   */
  export type ListEnumAccountTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AccountType[]'>
    


  /**
   * Reference to a field of type 'NormalBalance'
   */
  export type EnumNormalBalanceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NormalBalance'>
    


  /**
   * Reference to a field of type 'NormalBalance[]'
   */
  export type ListEnumNormalBalanceFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NormalBalance[]'>
    


  /**
   * Reference to a field of type 'ItemType'
   */
  export type EnumItemTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ItemType'>
    


  /**
   * Reference to a field of type 'ItemType[]'
   */
  export type ListEnumItemTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ItemType[]'>
    


  /**
   * Reference to a field of type 'ReminderScope'
   */
  export type EnumReminderScopeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReminderScope'>
    


  /**
   * Reference to a field of type 'ReminderScope[]'
   */
  export type ListEnumReminderScopeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReminderScope[]'>
    


  /**
   * Reference to a field of type 'ReminderStatus'
   */
  export type EnumReminderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReminderStatus'>
    


  /**
   * Reference to a field of type 'ReminderStatus[]'
   */
  export type ListEnumReminderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReminderStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserProfileWhereInput = {
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    id?: UuidFilter<"UserProfile"> | string
    email?: StringFilter<"UserProfile"> | string
    fullName?: StringNullableFilter<"UserProfile"> | string | null
    role?: EnumAuthUserRoleFilter<"UserProfile"> | $Enums.AuthUserRole
    provider?: EnumAuthProviderFilter<"UserProfile"> | $Enums.AuthProvider
    avatarUrl?: StringNullableFilter<"UserProfile"> | string | null
    isEmailVerified?: BoolFilter<"UserProfile"> | boolean
    createdAt?: DateTimeFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeFilter<"UserProfile"> | Date | string
    auditLogs?: AuthAuditLogListRelationFilter
  }

  export type UserProfileOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrderInput | SortOrder
    role?: SortOrder
    provider?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    isEmailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    auditLogs?: AuthAuditLogOrderByRelationAggregateInput
  }

  export type UserProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    fullName?: StringNullableFilter<"UserProfile"> | string | null
    role?: EnumAuthUserRoleFilter<"UserProfile"> | $Enums.AuthUserRole
    provider?: EnumAuthProviderFilter<"UserProfile"> | $Enums.AuthProvider
    avatarUrl?: StringNullableFilter<"UserProfile"> | string | null
    isEmailVerified?: BoolFilter<"UserProfile"> | boolean
    createdAt?: DateTimeFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeFilter<"UserProfile"> | Date | string
    auditLogs?: AuthAuditLogListRelationFilter
  }, "id" | "email">

  export type UserProfileOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrderInput | SortOrder
    role?: SortOrder
    provider?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    isEmailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserProfileCountOrderByAggregateInput
    _max?: UserProfileMaxOrderByAggregateInput
    _min?: UserProfileMinOrderByAggregateInput
  }

  export type UserProfileScalarWhereWithAggregatesInput = {
    AND?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    OR?: UserProfileScalarWhereWithAggregatesInput[]
    NOT?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"UserProfile"> | string
    email?: StringWithAggregatesFilter<"UserProfile"> | string
    fullName?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    role?: EnumAuthUserRoleWithAggregatesFilter<"UserProfile"> | $Enums.AuthUserRole
    provider?: EnumAuthProviderWithAggregatesFilter<"UserProfile"> | $Enums.AuthProvider
    avatarUrl?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    isEmailVerified?: BoolWithAggregatesFilter<"UserProfile"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserProfile"> | Date | string
  }

  export type AuthAuditLogWhereInput = {
    AND?: AuthAuditLogWhereInput | AuthAuditLogWhereInput[]
    OR?: AuthAuditLogWhereInput[]
    NOT?: AuthAuditLogWhereInput | AuthAuditLogWhereInput[]
    id?: BigIntFilter<"AuthAuditLog"> | bigint | number
    userId?: UuidNullableFilter<"AuthAuditLog"> | string | null
    email?: StringNullableFilter<"AuthAuditLog"> | string | null
    action?: StringFilter<"AuthAuditLog"> | string
    success?: BoolFilter<"AuthAuditLog"> | boolean
    message?: StringNullableFilter<"AuthAuditLog"> | string | null
    provider?: EnumAuthProviderNullableFilter<"AuthAuditLog"> | $Enums.AuthProvider | null
    role?: EnumAuthUserRoleNullableFilter<"AuthAuditLog"> | $Enums.AuthUserRole | null
    ipAddress?: StringNullableFilter<"AuthAuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuthAuditLog"> | Date | string
    user?: XOR<UserProfileNullableScalarRelationFilter, UserProfileWhereInput> | null
  }

  export type AuthAuditLogOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    action?: SortOrder
    success?: SortOrder
    message?: SortOrderInput | SortOrder
    provider?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserProfileOrderByWithRelationInput
  }

  export type AuthAuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: AuthAuditLogWhereInput | AuthAuditLogWhereInput[]
    OR?: AuthAuditLogWhereInput[]
    NOT?: AuthAuditLogWhereInput | AuthAuditLogWhereInput[]
    userId?: UuidNullableFilter<"AuthAuditLog"> | string | null
    email?: StringNullableFilter<"AuthAuditLog"> | string | null
    action?: StringFilter<"AuthAuditLog"> | string
    success?: BoolFilter<"AuthAuditLog"> | boolean
    message?: StringNullableFilter<"AuthAuditLog"> | string | null
    provider?: EnumAuthProviderNullableFilter<"AuthAuditLog"> | $Enums.AuthProvider | null
    role?: EnumAuthUserRoleNullableFilter<"AuthAuditLog"> | $Enums.AuthUserRole | null
    ipAddress?: StringNullableFilter<"AuthAuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuthAuditLog"> | Date | string
    user?: XOR<UserProfileNullableScalarRelationFilter, UserProfileWhereInput> | null
  }, "id">

  export type AuthAuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    action?: SortOrder
    success?: SortOrder
    message?: SortOrderInput | SortOrder
    provider?: SortOrderInput | SortOrder
    role?: SortOrderInput | SortOrder
    ipAddress?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AuthAuditLogCountOrderByAggregateInput
    _avg?: AuthAuditLogAvgOrderByAggregateInput
    _max?: AuthAuditLogMaxOrderByAggregateInput
    _min?: AuthAuditLogMinOrderByAggregateInput
    _sum?: AuthAuditLogSumOrderByAggregateInput
  }

  export type AuthAuditLogScalarWhereWithAggregatesInput = {
    AND?: AuthAuditLogScalarWhereWithAggregatesInput | AuthAuditLogScalarWhereWithAggregatesInput[]
    OR?: AuthAuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuthAuditLogScalarWhereWithAggregatesInput | AuthAuditLogScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"AuthAuditLog"> | bigint | number
    userId?: UuidNullableWithAggregatesFilter<"AuthAuditLog"> | string | null
    email?: StringNullableWithAggregatesFilter<"AuthAuditLog"> | string | null
    action?: StringWithAggregatesFilter<"AuthAuditLog"> | string
    success?: BoolWithAggregatesFilter<"AuthAuditLog"> | boolean
    message?: StringNullableWithAggregatesFilter<"AuthAuditLog"> | string | null
    provider?: EnumAuthProviderNullableWithAggregatesFilter<"AuthAuditLog"> | $Enums.AuthProvider | null
    role?: EnumAuthUserRoleNullableWithAggregatesFilter<"AuthAuditLog"> | $Enums.AuthUserRole | null
    ipAddress?: StringNullableWithAggregatesFilter<"AuthAuditLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AuthAuditLog"> | Date | string
  }

  export type PartnerWhereInput = {
    AND?: PartnerWhereInput | PartnerWhereInput[]
    OR?: PartnerWhereInput[]
    NOT?: PartnerWhereInput | PartnerWhereInput[]
    id?: UuidFilter<"Partner"> | string
    code?: StringFilter<"Partner"> | string
    name?: StringFilter<"Partner"> | string
    partnerType?: EnumPartnerTypeFilter<"Partner"> | $Enums.PartnerType
    taxCode?: StringNullableFilter<"Partner"> | string | null
    phone?: StringNullableFilter<"Partner"> | string | null
    email?: StringNullableFilter<"Partner"> | string | null
    address?: StringNullableFilter<"Partner"> | string | null
    paymentTermDays?: IntNullableFilter<"Partner"> | number | null
    creditLimit?: DecimalNullableFilter<"Partner"> | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFilter<"Partner"> | boolean
    debtReminderOn?: BoolFilter<"Partner"> | boolean
    reminderEmail?: StringNullableFilter<"Partner"> | string | null
    reminderCcEmails?: JsonNullableFilter<"Partner">
    createdAt?: DateTimeFilter<"Partner"> | Date | string
    updatedAt?: DateTimeFilter<"Partner"> | Date | string
    debtReminders?: DebtReminderConfigListRelationFilter
    debtReminderLogs?: DebtReminderLogListRelationFilter
  }

  export type PartnerOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    partnerType?: SortOrder
    taxCode?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    paymentTermDays?: SortOrderInput | SortOrder
    creditLimit?: SortOrderInput | SortOrder
    isActive?: SortOrder
    debtReminderOn?: SortOrder
    reminderEmail?: SortOrderInput | SortOrder
    reminderCcEmails?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    debtReminders?: DebtReminderConfigOrderByRelationAggregateInput
    debtReminderLogs?: DebtReminderLogOrderByRelationAggregateInput
  }

  export type PartnerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: PartnerWhereInput | PartnerWhereInput[]
    OR?: PartnerWhereInput[]
    NOT?: PartnerWhereInput | PartnerWhereInput[]
    name?: StringFilter<"Partner"> | string
    partnerType?: EnumPartnerTypeFilter<"Partner"> | $Enums.PartnerType
    taxCode?: StringNullableFilter<"Partner"> | string | null
    phone?: StringNullableFilter<"Partner"> | string | null
    email?: StringNullableFilter<"Partner"> | string | null
    address?: StringNullableFilter<"Partner"> | string | null
    paymentTermDays?: IntNullableFilter<"Partner"> | number | null
    creditLimit?: DecimalNullableFilter<"Partner"> | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFilter<"Partner"> | boolean
    debtReminderOn?: BoolFilter<"Partner"> | boolean
    reminderEmail?: StringNullableFilter<"Partner"> | string | null
    reminderCcEmails?: JsonNullableFilter<"Partner">
    createdAt?: DateTimeFilter<"Partner"> | Date | string
    updatedAt?: DateTimeFilter<"Partner"> | Date | string
    debtReminders?: DebtReminderConfigListRelationFilter
    debtReminderLogs?: DebtReminderLogListRelationFilter
  }, "id" | "code">

  export type PartnerOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    partnerType?: SortOrder
    taxCode?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    paymentTermDays?: SortOrderInput | SortOrder
    creditLimit?: SortOrderInput | SortOrder
    isActive?: SortOrder
    debtReminderOn?: SortOrder
    reminderEmail?: SortOrderInput | SortOrder
    reminderCcEmails?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PartnerCountOrderByAggregateInput
    _avg?: PartnerAvgOrderByAggregateInput
    _max?: PartnerMaxOrderByAggregateInput
    _min?: PartnerMinOrderByAggregateInput
    _sum?: PartnerSumOrderByAggregateInput
  }

  export type PartnerScalarWhereWithAggregatesInput = {
    AND?: PartnerScalarWhereWithAggregatesInput | PartnerScalarWhereWithAggregatesInput[]
    OR?: PartnerScalarWhereWithAggregatesInput[]
    NOT?: PartnerScalarWhereWithAggregatesInput | PartnerScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Partner"> | string
    code?: StringWithAggregatesFilter<"Partner"> | string
    name?: StringWithAggregatesFilter<"Partner"> | string
    partnerType?: EnumPartnerTypeWithAggregatesFilter<"Partner"> | $Enums.PartnerType
    taxCode?: StringNullableWithAggregatesFilter<"Partner"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Partner"> | string | null
    email?: StringNullableWithAggregatesFilter<"Partner"> | string | null
    address?: StringNullableWithAggregatesFilter<"Partner"> | string | null
    paymentTermDays?: IntNullableWithAggregatesFilter<"Partner"> | number | null
    creditLimit?: DecimalNullableWithAggregatesFilter<"Partner"> | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolWithAggregatesFilter<"Partner"> | boolean
    debtReminderOn?: BoolWithAggregatesFilter<"Partner"> | boolean
    reminderEmail?: StringNullableWithAggregatesFilter<"Partner"> | string | null
    reminderCcEmails?: JsonNullableWithAggregatesFilter<"Partner">
    createdAt?: DateTimeWithAggregatesFilter<"Partner"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Partner"> | Date | string
  }

  export type AccountWhereInput = {
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    id?: UuidFilter<"Account"> | string
    code?: StringFilter<"Account"> | string
    name?: StringFilter<"Account"> | string
    accountType?: EnumAccountTypeFilter<"Account"> | $Enums.AccountType
    normalBalance?: EnumNormalBalanceFilter<"Account"> | $Enums.NormalBalance
    parentId?: UuidNullableFilter<"Account"> | string | null
    level?: IntFilter<"Account"> | number
    isPosting?: BoolFilter<"Account"> | boolean
    allowManualEntry?: BoolFilter<"Account"> | boolean
    isActive?: BoolFilter<"Account"> | boolean
    sortOrder?: IntFilter<"Account"> | number
    description?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    parent?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    children?: AccountListRelationFilter
    revenueItems?: ItemListRelationFilter
    cogsItems?: ItemListRelationFilter
    inventoryItems?: ItemListRelationFilter
  }

  export type AccountOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    accountType?: SortOrder
    normalBalance?: SortOrder
    parentId?: SortOrderInput | SortOrder
    level?: SortOrder
    isPosting?: SortOrder
    allowManualEntry?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parent?: AccountOrderByWithRelationInput
    children?: AccountOrderByRelationAggregateInput
    revenueItems?: ItemOrderByRelationAggregateInput
    cogsItems?: ItemOrderByRelationAggregateInput
    inventoryItems?: ItemOrderByRelationAggregateInput
  }

  export type AccountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: AccountWhereInput | AccountWhereInput[]
    OR?: AccountWhereInput[]
    NOT?: AccountWhereInput | AccountWhereInput[]
    name?: StringFilter<"Account"> | string
    accountType?: EnumAccountTypeFilter<"Account"> | $Enums.AccountType
    normalBalance?: EnumNormalBalanceFilter<"Account"> | $Enums.NormalBalance
    parentId?: UuidNullableFilter<"Account"> | string | null
    level?: IntFilter<"Account"> | number
    isPosting?: BoolFilter<"Account"> | boolean
    allowManualEntry?: BoolFilter<"Account"> | boolean
    isActive?: BoolFilter<"Account"> | boolean
    sortOrder?: IntFilter<"Account"> | number
    description?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
    parent?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    children?: AccountListRelationFilter
    revenueItems?: ItemListRelationFilter
    cogsItems?: ItemListRelationFilter
    inventoryItems?: ItemListRelationFilter
  }, "id" | "code">

  export type AccountOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    accountType?: SortOrder
    normalBalance?: SortOrder
    parentId?: SortOrderInput | SortOrder
    level?: SortOrder
    isPosting?: SortOrder
    allowManualEntry?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AccountCountOrderByAggregateInput
    _avg?: AccountAvgOrderByAggregateInput
    _max?: AccountMaxOrderByAggregateInput
    _min?: AccountMinOrderByAggregateInput
    _sum?: AccountSumOrderByAggregateInput
  }

  export type AccountScalarWhereWithAggregatesInput = {
    AND?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    OR?: AccountScalarWhereWithAggregatesInput[]
    NOT?: AccountScalarWhereWithAggregatesInput | AccountScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Account"> | string
    code?: StringWithAggregatesFilter<"Account"> | string
    name?: StringWithAggregatesFilter<"Account"> | string
    accountType?: EnumAccountTypeWithAggregatesFilter<"Account"> | $Enums.AccountType
    normalBalance?: EnumNormalBalanceWithAggregatesFilter<"Account"> | $Enums.NormalBalance
    parentId?: UuidNullableWithAggregatesFilter<"Account"> | string | null
    level?: IntWithAggregatesFilter<"Account"> | number
    isPosting?: BoolWithAggregatesFilter<"Account"> | boolean
    allowManualEntry?: BoolWithAggregatesFilter<"Account"> | boolean
    isActive?: BoolWithAggregatesFilter<"Account"> | boolean
    sortOrder?: IntWithAggregatesFilter<"Account"> | number
    description?: StringNullableWithAggregatesFilter<"Account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Account"> | Date | string
  }

  export type ItemWhereInput = {
    AND?: ItemWhereInput | ItemWhereInput[]
    OR?: ItemWhereInput[]
    NOT?: ItemWhereInput | ItemWhereInput[]
    id?: UuidFilter<"Item"> | string
    sku?: StringFilter<"Item"> | string
    name?: StringFilter<"Item"> | string
    itemType?: EnumItemTypeFilter<"Item"> | $Enums.ItemType
    unit?: StringFilter<"Item"> | string
    salePrice?: DecimalNullableFilter<"Item"> | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: DecimalNullableFilter<"Item"> | Decimal | DecimalJsLike | number | string | null
    vatRate?: DecimalNullableFilter<"Item"> | Decimal | DecimalJsLike | number | string | null
    revenueAccountId?: UuidNullableFilter<"Item"> | string | null
    cogsAccountId?: UuidNullableFilter<"Item"> | string | null
    inventoryAccountId?: UuidNullableFilter<"Item"> | string | null
    isTrackedInventory?: BoolFilter<"Item"> | boolean
    isActive?: BoolFilter<"Item"> | boolean
    description?: StringNullableFilter<"Item"> | string | null
    createdAt?: DateTimeFilter<"Item"> | Date | string
    updatedAt?: DateTimeFilter<"Item"> | Date | string
    revenueAccount?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    cogsAccount?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    inventoryAccount?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
  }

  export type ItemOrderByWithRelationInput = {
    id?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    itemType?: SortOrder
    unit?: SortOrder
    salePrice?: SortOrderInput | SortOrder
    purchasePrice?: SortOrderInput | SortOrder
    vatRate?: SortOrderInput | SortOrder
    revenueAccountId?: SortOrderInput | SortOrder
    cogsAccountId?: SortOrderInput | SortOrder
    inventoryAccountId?: SortOrderInput | SortOrder
    isTrackedInventory?: SortOrder
    isActive?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    revenueAccount?: AccountOrderByWithRelationInput
    cogsAccount?: AccountOrderByWithRelationInput
    inventoryAccount?: AccountOrderByWithRelationInput
  }

  export type ItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sku?: string
    AND?: ItemWhereInput | ItemWhereInput[]
    OR?: ItemWhereInput[]
    NOT?: ItemWhereInput | ItemWhereInput[]
    name?: StringFilter<"Item"> | string
    itemType?: EnumItemTypeFilter<"Item"> | $Enums.ItemType
    unit?: StringFilter<"Item"> | string
    salePrice?: DecimalNullableFilter<"Item"> | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: DecimalNullableFilter<"Item"> | Decimal | DecimalJsLike | number | string | null
    vatRate?: DecimalNullableFilter<"Item"> | Decimal | DecimalJsLike | number | string | null
    revenueAccountId?: UuidNullableFilter<"Item"> | string | null
    cogsAccountId?: UuidNullableFilter<"Item"> | string | null
    inventoryAccountId?: UuidNullableFilter<"Item"> | string | null
    isTrackedInventory?: BoolFilter<"Item"> | boolean
    isActive?: BoolFilter<"Item"> | boolean
    description?: StringNullableFilter<"Item"> | string | null
    createdAt?: DateTimeFilter<"Item"> | Date | string
    updatedAt?: DateTimeFilter<"Item"> | Date | string
    revenueAccount?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    cogsAccount?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
    inventoryAccount?: XOR<AccountNullableScalarRelationFilter, AccountWhereInput> | null
  }, "id" | "sku">

  export type ItemOrderByWithAggregationInput = {
    id?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    itemType?: SortOrder
    unit?: SortOrder
    salePrice?: SortOrderInput | SortOrder
    purchasePrice?: SortOrderInput | SortOrder
    vatRate?: SortOrderInput | SortOrder
    revenueAccountId?: SortOrderInput | SortOrder
    cogsAccountId?: SortOrderInput | SortOrder
    inventoryAccountId?: SortOrderInput | SortOrder
    isTrackedInventory?: SortOrder
    isActive?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ItemCountOrderByAggregateInput
    _avg?: ItemAvgOrderByAggregateInput
    _max?: ItemMaxOrderByAggregateInput
    _min?: ItemMinOrderByAggregateInput
    _sum?: ItemSumOrderByAggregateInput
  }

  export type ItemScalarWhereWithAggregatesInput = {
    AND?: ItemScalarWhereWithAggregatesInput | ItemScalarWhereWithAggregatesInput[]
    OR?: ItemScalarWhereWithAggregatesInput[]
    NOT?: ItemScalarWhereWithAggregatesInput | ItemScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Item"> | string
    sku?: StringWithAggregatesFilter<"Item"> | string
    name?: StringWithAggregatesFilter<"Item"> | string
    itemType?: EnumItemTypeWithAggregatesFilter<"Item"> | $Enums.ItemType
    unit?: StringWithAggregatesFilter<"Item"> | string
    salePrice?: DecimalNullableWithAggregatesFilter<"Item"> | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: DecimalNullableWithAggregatesFilter<"Item"> | Decimal | DecimalJsLike | number | string | null
    vatRate?: DecimalNullableWithAggregatesFilter<"Item"> | Decimal | DecimalJsLike | number | string | null
    revenueAccountId?: UuidNullableWithAggregatesFilter<"Item"> | string | null
    cogsAccountId?: UuidNullableWithAggregatesFilter<"Item"> | string | null
    inventoryAccountId?: UuidNullableWithAggregatesFilter<"Item"> | string | null
    isTrackedInventory?: BoolWithAggregatesFilter<"Item"> | boolean
    isActive?: BoolWithAggregatesFilter<"Item"> | boolean
    description?: StringNullableWithAggregatesFilter<"Item"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Item"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Item"> | Date | string
  }

  export type DebtReminderConfigWhereInput = {
    AND?: DebtReminderConfigWhereInput | DebtReminderConfigWhereInput[]
    OR?: DebtReminderConfigWhereInput[]
    NOT?: DebtReminderConfigWhereInput | DebtReminderConfigWhereInput[]
    id?: UuidFilter<"DebtReminderConfig"> | string
    partnerId?: UuidFilter<"DebtReminderConfig"> | string
    scope?: EnumReminderScopeFilter<"DebtReminderConfig"> | $Enums.ReminderScope
    enabled?: BoolFilter<"DebtReminderConfig"> | boolean
    daysBeforeDue?: IntFilter<"DebtReminderConfig"> | number
    daysAfterDue?: IntFilter<"DebtReminderConfig"> | number
    recipientEmail?: StringNullableFilter<"DebtReminderConfig"> | string | null
    ccEmails?: JsonNullableFilter<"DebtReminderConfig">
    lastSentAt?: DateTimeNullableFilter<"DebtReminderConfig"> | Date | string | null
    createdAt?: DateTimeFilter<"DebtReminderConfig"> | Date | string
    updatedAt?: DateTimeFilter<"DebtReminderConfig"> | Date | string
    partner?: XOR<PartnerScalarRelationFilter, PartnerWhereInput>
  }

  export type DebtReminderConfigOrderByWithRelationInput = {
    id?: SortOrder
    partnerId?: SortOrder
    scope?: SortOrder
    enabled?: SortOrder
    daysBeforeDue?: SortOrder
    daysAfterDue?: SortOrder
    recipientEmail?: SortOrderInput | SortOrder
    ccEmails?: SortOrderInput | SortOrder
    lastSentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    partner?: PartnerOrderByWithRelationInput
  }

  export type DebtReminderConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    partnerId_scope?: DebtReminderConfigPartnerIdScopeCompoundUniqueInput
    AND?: DebtReminderConfigWhereInput | DebtReminderConfigWhereInput[]
    OR?: DebtReminderConfigWhereInput[]
    NOT?: DebtReminderConfigWhereInput | DebtReminderConfigWhereInput[]
    partnerId?: UuidFilter<"DebtReminderConfig"> | string
    scope?: EnumReminderScopeFilter<"DebtReminderConfig"> | $Enums.ReminderScope
    enabled?: BoolFilter<"DebtReminderConfig"> | boolean
    daysBeforeDue?: IntFilter<"DebtReminderConfig"> | number
    daysAfterDue?: IntFilter<"DebtReminderConfig"> | number
    recipientEmail?: StringNullableFilter<"DebtReminderConfig"> | string | null
    ccEmails?: JsonNullableFilter<"DebtReminderConfig">
    lastSentAt?: DateTimeNullableFilter<"DebtReminderConfig"> | Date | string | null
    createdAt?: DateTimeFilter<"DebtReminderConfig"> | Date | string
    updatedAt?: DateTimeFilter<"DebtReminderConfig"> | Date | string
    partner?: XOR<PartnerScalarRelationFilter, PartnerWhereInput>
  }, "id" | "partnerId_scope">

  export type DebtReminderConfigOrderByWithAggregationInput = {
    id?: SortOrder
    partnerId?: SortOrder
    scope?: SortOrder
    enabled?: SortOrder
    daysBeforeDue?: SortOrder
    daysAfterDue?: SortOrder
    recipientEmail?: SortOrderInput | SortOrder
    ccEmails?: SortOrderInput | SortOrder
    lastSentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DebtReminderConfigCountOrderByAggregateInput
    _avg?: DebtReminderConfigAvgOrderByAggregateInput
    _max?: DebtReminderConfigMaxOrderByAggregateInput
    _min?: DebtReminderConfigMinOrderByAggregateInput
    _sum?: DebtReminderConfigSumOrderByAggregateInput
  }

  export type DebtReminderConfigScalarWhereWithAggregatesInput = {
    AND?: DebtReminderConfigScalarWhereWithAggregatesInput | DebtReminderConfigScalarWhereWithAggregatesInput[]
    OR?: DebtReminderConfigScalarWhereWithAggregatesInput[]
    NOT?: DebtReminderConfigScalarWhereWithAggregatesInput | DebtReminderConfigScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"DebtReminderConfig"> | string
    partnerId?: UuidWithAggregatesFilter<"DebtReminderConfig"> | string
    scope?: EnumReminderScopeWithAggregatesFilter<"DebtReminderConfig"> | $Enums.ReminderScope
    enabled?: BoolWithAggregatesFilter<"DebtReminderConfig"> | boolean
    daysBeforeDue?: IntWithAggregatesFilter<"DebtReminderConfig"> | number
    daysAfterDue?: IntWithAggregatesFilter<"DebtReminderConfig"> | number
    recipientEmail?: StringNullableWithAggregatesFilter<"DebtReminderConfig"> | string | null
    ccEmails?: JsonNullableWithAggregatesFilter<"DebtReminderConfig">
    lastSentAt?: DateTimeNullableWithAggregatesFilter<"DebtReminderConfig"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DebtReminderConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DebtReminderConfig"> | Date | string
  }

  export type DebtReminderLogWhereInput = {
    AND?: DebtReminderLogWhereInput | DebtReminderLogWhereInput[]
    OR?: DebtReminderLogWhereInput[]
    NOT?: DebtReminderLogWhereInput | DebtReminderLogWhereInput[]
    id?: BigIntFilter<"DebtReminderLog"> | bigint | number
    partnerId?: UuidFilter<"DebtReminderLog"> | string
    scope?: EnumReminderScopeFilter<"DebtReminderLog"> | $Enums.ReminderScope
    invoiceRef?: StringNullableFilter<"DebtReminderLog"> | string | null
    recipientEmail?: StringFilter<"DebtReminderLog"> | string
    subject?: StringFilter<"DebtReminderLog"> | string
    status?: EnumReminderStatusFilter<"DebtReminderLog"> | $Enums.ReminderStatus
    errorMessage?: StringNullableFilter<"DebtReminderLog"> | string | null
    scheduledAt?: DateTimeFilter<"DebtReminderLog"> | Date | string
    sentAt?: DateTimeNullableFilter<"DebtReminderLog"> | Date | string | null
    createdAt?: DateTimeFilter<"DebtReminderLog"> | Date | string
    partner?: XOR<PartnerScalarRelationFilter, PartnerWhereInput>
  }

  export type DebtReminderLogOrderByWithRelationInput = {
    id?: SortOrder
    partnerId?: SortOrder
    scope?: SortOrder
    invoiceRef?: SortOrderInput | SortOrder
    recipientEmail?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    scheduledAt?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    partner?: PartnerOrderByWithRelationInput
  }

  export type DebtReminderLogWhereUniqueInput = Prisma.AtLeast<{
    id?: bigint | number
    AND?: DebtReminderLogWhereInput | DebtReminderLogWhereInput[]
    OR?: DebtReminderLogWhereInput[]
    NOT?: DebtReminderLogWhereInput | DebtReminderLogWhereInput[]
    partnerId?: UuidFilter<"DebtReminderLog"> | string
    scope?: EnumReminderScopeFilter<"DebtReminderLog"> | $Enums.ReminderScope
    invoiceRef?: StringNullableFilter<"DebtReminderLog"> | string | null
    recipientEmail?: StringFilter<"DebtReminderLog"> | string
    subject?: StringFilter<"DebtReminderLog"> | string
    status?: EnumReminderStatusFilter<"DebtReminderLog"> | $Enums.ReminderStatus
    errorMessage?: StringNullableFilter<"DebtReminderLog"> | string | null
    scheduledAt?: DateTimeFilter<"DebtReminderLog"> | Date | string
    sentAt?: DateTimeNullableFilter<"DebtReminderLog"> | Date | string | null
    createdAt?: DateTimeFilter<"DebtReminderLog"> | Date | string
    partner?: XOR<PartnerScalarRelationFilter, PartnerWhereInput>
  }, "id">

  export type DebtReminderLogOrderByWithAggregationInput = {
    id?: SortOrder
    partnerId?: SortOrder
    scope?: SortOrder
    invoiceRef?: SortOrderInput | SortOrder
    recipientEmail?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    scheduledAt?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DebtReminderLogCountOrderByAggregateInput
    _avg?: DebtReminderLogAvgOrderByAggregateInput
    _max?: DebtReminderLogMaxOrderByAggregateInput
    _min?: DebtReminderLogMinOrderByAggregateInput
    _sum?: DebtReminderLogSumOrderByAggregateInput
  }

  export type DebtReminderLogScalarWhereWithAggregatesInput = {
    AND?: DebtReminderLogScalarWhereWithAggregatesInput | DebtReminderLogScalarWhereWithAggregatesInput[]
    OR?: DebtReminderLogScalarWhereWithAggregatesInput[]
    NOT?: DebtReminderLogScalarWhereWithAggregatesInput | DebtReminderLogScalarWhereWithAggregatesInput[]
    id?: BigIntWithAggregatesFilter<"DebtReminderLog"> | bigint | number
    partnerId?: UuidWithAggregatesFilter<"DebtReminderLog"> | string
    scope?: EnumReminderScopeWithAggregatesFilter<"DebtReminderLog"> | $Enums.ReminderScope
    invoiceRef?: StringNullableWithAggregatesFilter<"DebtReminderLog"> | string | null
    recipientEmail?: StringWithAggregatesFilter<"DebtReminderLog"> | string
    subject?: StringWithAggregatesFilter<"DebtReminderLog"> | string
    status?: EnumReminderStatusWithAggregatesFilter<"DebtReminderLog"> | $Enums.ReminderStatus
    errorMessage?: StringNullableWithAggregatesFilter<"DebtReminderLog"> | string | null
    scheduledAt?: DateTimeWithAggregatesFilter<"DebtReminderLog"> | Date | string
    sentAt?: DateTimeNullableWithAggregatesFilter<"DebtReminderLog"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"DebtReminderLog"> | Date | string
  }

  export type UserProfileCreateInput = {
    id: string
    email: string
    fullName?: string | null
    role?: $Enums.AuthUserRole
    provider?: $Enums.AuthProvider
    avatarUrl?: string | null
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    auditLogs?: AuthAuditLogCreateNestedManyWithoutUserInput
  }

  export type UserProfileUncheckedCreateInput = {
    id: string
    email: string
    fullName?: string | null
    role?: $Enums.AuthUserRole
    provider?: $Enums.AuthProvider
    avatarUrl?: string | null
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    auditLogs?: AuthAuditLogUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserProfileUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumAuthUserRoleFieldUpdateOperationsInput | $Enums.AuthUserRole
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: AuthAuditLogUpdateManyWithoutUserNestedInput
  }

  export type UserProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumAuthUserRoleFieldUpdateOperationsInput | $Enums.AuthUserRole
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: AuthAuditLogUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserProfileCreateManyInput = {
    id: string
    email: string
    fullName?: string | null
    role?: $Enums.AuthUserRole
    provider?: $Enums.AuthProvider
    avatarUrl?: string | null
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserProfileUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumAuthUserRoleFieldUpdateOperationsInput | $Enums.AuthUserRole
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumAuthUserRoleFieldUpdateOperationsInput | $Enums.AuthUserRole
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthAuditLogCreateInput = {
    id?: bigint | number
    email?: string | null
    action: string
    success: boolean
    message?: string | null
    provider?: $Enums.AuthProvider | null
    role?: $Enums.AuthUserRole | null
    ipAddress?: string | null
    createdAt?: Date | string
    user?: UserProfileCreateNestedOneWithoutAuditLogsInput
  }

  export type AuthAuditLogUncheckedCreateInput = {
    id?: bigint | number
    userId?: string | null
    email?: string | null
    action: string
    success: boolean
    message?: string | null
    provider?: $Enums.AuthProvider | null
    role?: $Enums.AuthUserRole | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type AuthAuditLogUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    message?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableEnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider | null
    role?: NullableEnumAuthUserRoleFieldUpdateOperationsInput | $Enums.AuthUserRole | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserProfileUpdateOneWithoutAuditLogsNestedInput
  }

  export type AuthAuditLogUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    message?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableEnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider | null
    role?: NullableEnumAuthUserRoleFieldUpdateOperationsInput | $Enums.AuthUserRole | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthAuditLogCreateManyInput = {
    id?: bigint | number
    userId?: string | null
    email?: string | null
    action: string
    success: boolean
    message?: string | null
    provider?: $Enums.AuthProvider | null
    role?: $Enums.AuthUserRole | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type AuthAuditLogUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    message?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableEnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider | null
    role?: NullableEnumAuthUserRoleFieldUpdateOperationsInput | $Enums.AuthUserRole | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthAuditLogUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    message?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableEnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider | null
    role?: NullableEnumAuthUserRoleFieldUpdateOperationsInput | $Enums.AuthUserRole | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerCreateInput = {
    id?: string
    code: string
    name: string
    partnerType?: $Enums.PartnerType
    taxCode?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    paymentTermDays?: number | null
    creditLimit?: Decimal | DecimalJsLike | number | string | null
    isActive?: boolean
    debtReminderOn?: boolean
    reminderEmail?: string | null
    reminderCcEmails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    debtReminders?: DebtReminderConfigCreateNestedManyWithoutPartnerInput
    debtReminderLogs?: DebtReminderLogCreateNestedManyWithoutPartnerInput
  }

  export type PartnerUncheckedCreateInput = {
    id?: string
    code: string
    name: string
    partnerType?: $Enums.PartnerType
    taxCode?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    paymentTermDays?: number | null
    creditLimit?: Decimal | DecimalJsLike | number | string | null
    isActive?: boolean
    debtReminderOn?: boolean
    reminderEmail?: string | null
    reminderCcEmails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    debtReminders?: DebtReminderConfigUncheckedCreateNestedManyWithoutPartnerInput
    debtReminderLogs?: DebtReminderLogUncheckedCreateNestedManyWithoutPartnerInput
  }

  export type PartnerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    partnerType?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    taxCode?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTermDays?: NullableIntFieldUpdateOperationsInput | number | null
    creditLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    debtReminderOn?: BoolFieldUpdateOperationsInput | boolean
    reminderEmail?: NullableStringFieldUpdateOperationsInput | string | null
    reminderCcEmails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    debtReminders?: DebtReminderConfigUpdateManyWithoutPartnerNestedInput
    debtReminderLogs?: DebtReminderLogUpdateManyWithoutPartnerNestedInput
  }

  export type PartnerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    partnerType?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    taxCode?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTermDays?: NullableIntFieldUpdateOperationsInput | number | null
    creditLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    debtReminderOn?: BoolFieldUpdateOperationsInput | boolean
    reminderEmail?: NullableStringFieldUpdateOperationsInput | string | null
    reminderCcEmails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    debtReminders?: DebtReminderConfigUncheckedUpdateManyWithoutPartnerNestedInput
    debtReminderLogs?: DebtReminderLogUncheckedUpdateManyWithoutPartnerNestedInput
  }

  export type PartnerCreateManyInput = {
    id?: string
    code: string
    name: string
    partnerType?: $Enums.PartnerType
    taxCode?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    paymentTermDays?: number | null
    creditLimit?: Decimal | DecimalJsLike | number | string | null
    isActive?: boolean
    debtReminderOn?: boolean
    reminderEmail?: string | null
    reminderCcEmails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PartnerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    partnerType?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    taxCode?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTermDays?: NullableIntFieldUpdateOperationsInput | number | null
    creditLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    debtReminderOn?: BoolFieldUpdateOperationsInput | boolean
    reminderEmail?: NullableStringFieldUpdateOperationsInput | string | null
    reminderCcEmails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PartnerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    partnerType?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    taxCode?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTermDays?: NullableIntFieldUpdateOperationsInput | number | null
    creditLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    debtReminderOn?: BoolFieldUpdateOperationsInput | boolean
    reminderEmail?: NullableStringFieldUpdateOperationsInput | string | null
    reminderCcEmails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateInput = {
    id?: string
    code: string
    name: string
    accountType: $Enums.AccountType
    normalBalance: $Enums.NormalBalance
    level?: number
    isPosting?: boolean
    allowManualEntry?: boolean
    isActive?: boolean
    sortOrder?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: AccountCreateNestedOneWithoutChildrenInput
    children?: AccountCreateNestedManyWithoutParentInput
    revenueItems?: ItemCreateNestedManyWithoutRevenueAccountInput
    cogsItems?: ItemCreateNestedManyWithoutCogsAccountInput
    inventoryItems?: ItemCreateNestedManyWithoutInventoryAccountInput
  }

  export type AccountUncheckedCreateInput = {
    id?: string
    code: string
    name: string
    accountType: $Enums.AccountType
    normalBalance: $Enums.NormalBalance
    parentId?: string | null
    level?: number
    isPosting?: boolean
    allowManualEntry?: boolean
    isActive?: boolean
    sortOrder?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: AccountUncheckedCreateNestedManyWithoutParentInput
    revenueItems?: ItemUncheckedCreateNestedManyWithoutRevenueAccountInput
    cogsItems?: ItemUncheckedCreateNestedManyWithoutCogsAccountInput
    inventoryItems?: ItemUncheckedCreateNestedManyWithoutInventoryAccountInput
  }

  export type AccountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    normalBalance?: EnumNormalBalanceFieldUpdateOperationsInput | $Enums.NormalBalance
    level?: IntFieldUpdateOperationsInput | number
    isPosting?: BoolFieldUpdateOperationsInput | boolean
    allowManualEntry?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: AccountUpdateOneWithoutChildrenNestedInput
    children?: AccountUpdateManyWithoutParentNestedInput
    revenueItems?: ItemUpdateManyWithoutRevenueAccountNestedInput
    cogsItems?: ItemUpdateManyWithoutCogsAccountNestedInput
    inventoryItems?: ItemUpdateManyWithoutInventoryAccountNestedInput
  }

  export type AccountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    normalBalance?: EnumNormalBalanceFieldUpdateOperationsInput | $Enums.NormalBalance
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    level?: IntFieldUpdateOperationsInput | number
    isPosting?: BoolFieldUpdateOperationsInput | boolean
    allowManualEntry?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: AccountUncheckedUpdateManyWithoutParentNestedInput
    revenueItems?: ItemUncheckedUpdateManyWithoutRevenueAccountNestedInput
    cogsItems?: ItemUncheckedUpdateManyWithoutCogsAccountNestedInput
    inventoryItems?: ItemUncheckedUpdateManyWithoutInventoryAccountNestedInput
  }

  export type AccountCreateManyInput = {
    id?: string
    code: string
    name: string
    accountType: $Enums.AccountType
    normalBalance: $Enums.NormalBalance
    parentId?: string | null
    level?: number
    isPosting?: boolean
    allowManualEntry?: boolean
    isActive?: boolean
    sortOrder?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    normalBalance?: EnumNormalBalanceFieldUpdateOperationsInput | $Enums.NormalBalance
    level?: IntFieldUpdateOperationsInput | number
    isPosting?: BoolFieldUpdateOperationsInput | boolean
    allowManualEntry?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    normalBalance?: EnumNormalBalanceFieldUpdateOperationsInput | $Enums.NormalBalance
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    level?: IntFieldUpdateOperationsInput | number
    isPosting?: BoolFieldUpdateOperationsInput | boolean
    allowManualEntry?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemCreateInput = {
    id?: string
    sku: string
    name: string
    itemType?: $Enums.ItemType
    unit: string
    salePrice?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    vatRate?: Decimal | DecimalJsLike | number | string | null
    isTrackedInventory?: boolean
    isActive?: boolean
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    revenueAccount?: AccountCreateNestedOneWithoutRevenueItemsInput
    cogsAccount?: AccountCreateNestedOneWithoutCogsItemsInput
    inventoryAccount?: AccountCreateNestedOneWithoutInventoryItemsInput
  }

  export type ItemUncheckedCreateInput = {
    id?: string
    sku: string
    name: string
    itemType?: $Enums.ItemType
    unit: string
    salePrice?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    vatRate?: Decimal | DecimalJsLike | number | string | null
    revenueAccountId?: string | null
    cogsAccountId?: string | null
    inventoryAccountId?: string | null
    isTrackedInventory?: boolean
    isActive?: boolean
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    itemType?: EnumItemTypeFieldUpdateOperationsInput | $Enums.ItemType
    unit?: StringFieldUpdateOperationsInput | string
    salePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    vatRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isTrackedInventory?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revenueAccount?: AccountUpdateOneWithoutRevenueItemsNestedInput
    cogsAccount?: AccountUpdateOneWithoutCogsItemsNestedInput
    inventoryAccount?: AccountUpdateOneWithoutInventoryItemsNestedInput
  }

  export type ItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    itemType?: EnumItemTypeFieldUpdateOperationsInput | $Enums.ItemType
    unit?: StringFieldUpdateOperationsInput | string
    salePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    vatRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    revenueAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    cogsAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    inventoryAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isTrackedInventory?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemCreateManyInput = {
    id?: string
    sku: string
    name: string
    itemType?: $Enums.ItemType
    unit: string
    salePrice?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    vatRate?: Decimal | DecimalJsLike | number | string | null
    revenueAccountId?: string | null
    cogsAccountId?: string | null
    inventoryAccountId?: string | null
    isTrackedInventory?: boolean
    isActive?: boolean
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    itemType?: EnumItemTypeFieldUpdateOperationsInput | $Enums.ItemType
    unit?: StringFieldUpdateOperationsInput | string
    salePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    vatRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isTrackedInventory?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    itemType?: EnumItemTypeFieldUpdateOperationsInput | $Enums.ItemType
    unit?: StringFieldUpdateOperationsInput | string
    salePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    vatRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    revenueAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    cogsAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    inventoryAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isTrackedInventory?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DebtReminderConfigCreateInput = {
    id?: string
    scope?: $Enums.ReminderScope
    enabled?: boolean
    daysBeforeDue?: number
    daysAfterDue?: number
    recipientEmail?: string | null
    ccEmails?: NullableJsonNullValueInput | InputJsonValue
    lastSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    partner: PartnerCreateNestedOneWithoutDebtRemindersInput
  }

  export type DebtReminderConfigUncheckedCreateInput = {
    id?: string
    partnerId: string
    scope?: $Enums.ReminderScope
    enabled?: boolean
    daysBeforeDue?: number
    daysAfterDue?: number
    recipientEmail?: string | null
    ccEmails?: NullableJsonNullValueInput | InputJsonValue
    lastSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DebtReminderConfigUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    scope?: EnumReminderScopeFieldUpdateOperationsInput | $Enums.ReminderScope
    enabled?: BoolFieldUpdateOperationsInput | boolean
    daysBeforeDue?: IntFieldUpdateOperationsInput | number
    daysAfterDue?: IntFieldUpdateOperationsInput | number
    recipientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    ccEmails?: NullableJsonNullValueInput | InputJsonValue
    lastSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    partner?: PartnerUpdateOneRequiredWithoutDebtRemindersNestedInput
  }

  export type DebtReminderConfigUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    partnerId?: StringFieldUpdateOperationsInput | string
    scope?: EnumReminderScopeFieldUpdateOperationsInput | $Enums.ReminderScope
    enabled?: BoolFieldUpdateOperationsInput | boolean
    daysBeforeDue?: IntFieldUpdateOperationsInput | number
    daysAfterDue?: IntFieldUpdateOperationsInput | number
    recipientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    ccEmails?: NullableJsonNullValueInput | InputJsonValue
    lastSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DebtReminderConfigCreateManyInput = {
    id?: string
    partnerId: string
    scope?: $Enums.ReminderScope
    enabled?: boolean
    daysBeforeDue?: number
    daysAfterDue?: number
    recipientEmail?: string | null
    ccEmails?: NullableJsonNullValueInput | InputJsonValue
    lastSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DebtReminderConfigUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    scope?: EnumReminderScopeFieldUpdateOperationsInput | $Enums.ReminderScope
    enabled?: BoolFieldUpdateOperationsInput | boolean
    daysBeforeDue?: IntFieldUpdateOperationsInput | number
    daysAfterDue?: IntFieldUpdateOperationsInput | number
    recipientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    ccEmails?: NullableJsonNullValueInput | InputJsonValue
    lastSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DebtReminderConfigUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    partnerId?: StringFieldUpdateOperationsInput | string
    scope?: EnumReminderScopeFieldUpdateOperationsInput | $Enums.ReminderScope
    enabled?: BoolFieldUpdateOperationsInput | boolean
    daysBeforeDue?: IntFieldUpdateOperationsInput | number
    daysAfterDue?: IntFieldUpdateOperationsInput | number
    recipientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    ccEmails?: NullableJsonNullValueInput | InputJsonValue
    lastSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DebtReminderLogCreateInput = {
    id?: bigint | number
    scope: $Enums.ReminderScope
    invoiceRef?: string | null
    recipientEmail: string
    subject: string
    status?: $Enums.ReminderStatus
    errorMessage?: string | null
    scheduledAt?: Date | string
    sentAt?: Date | string | null
    createdAt?: Date | string
    partner: PartnerCreateNestedOneWithoutDebtReminderLogsInput
  }

  export type DebtReminderLogUncheckedCreateInput = {
    id?: bigint | number
    partnerId: string
    scope: $Enums.ReminderScope
    invoiceRef?: string | null
    recipientEmail: string
    subject: string
    status?: $Enums.ReminderStatus
    errorMessage?: string | null
    scheduledAt?: Date | string
    sentAt?: Date | string | null
    createdAt?: Date | string
  }

  export type DebtReminderLogUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    scope?: EnumReminderScopeFieldUpdateOperationsInput | $Enums.ReminderScope
    invoiceRef?: NullableStringFieldUpdateOperationsInput | string | null
    recipientEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    partner?: PartnerUpdateOneRequiredWithoutDebtReminderLogsNestedInput
  }

  export type DebtReminderLogUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    partnerId?: StringFieldUpdateOperationsInput | string
    scope?: EnumReminderScopeFieldUpdateOperationsInput | $Enums.ReminderScope
    invoiceRef?: NullableStringFieldUpdateOperationsInput | string | null
    recipientEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DebtReminderLogCreateManyInput = {
    id?: bigint | number
    partnerId: string
    scope: $Enums.ReminderScope
    invoiceRef?: string | null
    recipientEmail: string
    subject: string
    status?: $Enums.ReminderStatus
    errorMessage?: string | null
    scheduledAt?: Date | string
    sentAt?: Date | string | null
    createdAt?: Date | string
  }

  export type DebtReminderLogUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    scope?: EnumReminderScopeFieldUpdateOperationsInput | $Enums.ReminderScope
    invoiceRef?: NullableStringFieldUpdateOperationsInput | string | null
    recipientEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DebtReminderLogUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    partnerId?: StringFieldUpdateOperationsInput | string
    scope?: EnumReminderScopeFieldUpdateOperationsInput | $Enums.ReminderScope
    invoiceRef?: NullableStringFieldUpdateOperationsInput | string | null
    recipientEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumAuthUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthUserRole | EnumAuthUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AuthUserRole[] | ListEnumAuthUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthUserRole[] | ListEnumAuthUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthUserRoleFilter<$PrismaModel> | $Enums.AuthUserRole
  }

  export type EnumAuthProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderFilter<$PrismaModel> | $Enums.AuthProvider
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AuthAuditLogListRelationFilter = {
    every?: AuthAuditLogWhereInput
    some?: AuthAuditLogWhereInput
    none?: AuthAuditLogWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AuthAuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserProfileCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    provider?: SortOrder
    avatarUrl?: SortOrder
    isEmailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    provider?: SortOrder
    avatarUrl?: SortOrder
    isEmailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserProfileMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    fullName?: SortOrder
    role?: SortOrder
    provider?: SortOrder
    avatarUrl?: SortOrder
    isEmailVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumAuthUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthUserRole | EnumAuthUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AuthUserRole[] | ListEnumAuthUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthUserRole[] | ListEnumAuthUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.AuthUserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthUserRoleFilter<$PrismaModel>
    _max?: NestedEnumAuthUserRoleFilter<$PrismaModel>
  }

  export type EnumAuthProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderWithAggregatesFilter<$PrismaModel> | $Enums.AuthProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthProviderFilter<$PrismaModel>
    _max?: NestedEnumAuthProviderFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type UuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type EnumAuthProviderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel> | null
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAuthProviderNullableFilter<$PrismaModel> | $Enums.AuthProvider | null
  }

  export type EnumAuthUserRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthUserRole | EnumAuthUserRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.AuthUserRole[] | ListEnumAuthUserRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AuthUserRole[] | ListEnumAuthUserRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAuthUserRoleNullableFilter<$PrismaModel> | $Enums.AuthUserRole | null
  }

  export type UserProfileNullableScalarRelationFilter = {
    is?: UserProfileWhereInput | null
    isNot?: UserProfileWhereInput | null
  }

  export type AuthAuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    action?: SortOrder
    success?: SortOrder
    message?: SortOrder
    provider?: SortOrder
    role?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type AuthAuditLogAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AuthAuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    action?: SortOrder
    success?: SortOrder
    message?: SortOrder
    provider?: SortOrder
    role?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type AuthAuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    email?: SortOrder
    action?: SortOrder
    success?: SortOrder
    message?: SortOrder
    provider?: SortOrder
    role?: SortOrder
    ipAddress?: SortOrder
    createdAt?: SortOrder
  }

  export type AuthAuditLogSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type UuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumAuthProviderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel> | null
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAuthProviderNullableWithAggregatesFilter<$PrismaModel> | $Enums.AuthProvider | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAuthProviderNullableFilter<$PrismaModel>
    _max?: NestedEnumAuthProviderNullableFilter<$PrismaModel>
  }

  export type EnumAuthUserRoleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthUserRole | EnumAuthUserRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.AuthUserRole[] | ListEnumAuthUserRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AuthUserRole[] | ListEnumAuthUserRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAuthUserRoleNullableWithAggregatesFilter<$PrismaModel> | $Enums.AuthUserRole | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAuthUserRoleNullableFilter<$PrismaModel>
    _max?: NestedEnumAuthUserRoleNullableFilter<$PrismaModel>
  }

  export type EnumPartnerTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PartnerType | EnumPartnerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPartnerTypeFilter<$PrismaModel> | $Enums.PartnerType
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DebtReminderConfigListRelationFilter = {
    every?: DebtReminderConfigWhereInput
    some?: DebtReminderConfigWhereInput
    none?: DebtReminderConfigWhereInput
  }

  export type DebtReminderLogListRelationFilter = {
    every?: DebtReminderLogWhereInput
    some?: DebtReminderLogWhereInput
    none?: DebtReminderLogWhereInput
  }

  export type DebtReminderConfigOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DebtReminderLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PartnerCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    partnerType?: SortOrder
    taxCode?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    paymentTermDays?: SortOrder
    creditLimit?: SortOrder
    isActive?: SortOrder
    debtReminderOn?: SortOrder
    reminderEmail?: SortOrder
    reminderCcEmails?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerAvgOrderByAggregateInput = {
    paymentTermDays?: SortOrder
    creditLimit?: SortOrder
  }

  export type PartnerMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    partnerType?: SortOrder
    taxCode?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    paymentTermDays?: SortOrder
    creditLimit?: SortOrder
    isActive?: SortOrder
    debtReminderOn?: SortOrder
    reminderEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    partnerType?: SortOrder
    taxCode?: SortOrder
    phone?: SortOrder
    email?: SortOrder
    address?: SortOrder
    paymentTermDays?: SortOrder
    creditLimit?: SortOrder
    isActive?: SortOrder
    debtReminderOn?: SortOrder
    reminderEmail?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PartnerSumOrderByAggregateInput = {
    paymentTermDays?: SortOrder
    creditLimit?: SortOrder
  }

  export type EnumPartnerTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PartnerType | EnumPartnerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPartnerTypeWithAggregatesFilter<$PrismaModel> | $Enums.PartnerType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPartnerTypeFilter<$PrismaModel>
    _max?: NestedEnumPartnerTypeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumAccountTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeFilter<$PrismaModel> | $Enums.AccountType
  }

  export type EnumNormalBalanceFilter<$PrismaModel = never> = {
    equals?: $Enums.NormalBalance | EnumNormalBalanceFieldRefInput<$PrismaModel>
    in?: $Enums.NormalBalance[] | ListEnumNormalBalanceFieldRefInput<$PrismaModel>
    notIn?: $Enums.NormalBalance[] | ListEnumNormalBalanceFieldRefInput<$PrismaModel>
    not?: NestedEnumNormalBalanceFilter<$PrismaModel> | $Enums.NormalBalance
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type AccountNullableScalarRelationFilter = {
    is?: AccountWhereInput | null
    isNot?: AccountWhereInput | null
  }

  export type AccountListRelationFilter = {
    every?: AccountWhereInput
    some?: AccountWhereInput
    none?: AccountWhereInput
  }

  export type ItemListRelationFilter = {
    every?: ItemWhereInput
    some?: ItemWhereInput
    none?: ItemWhereInput
  }

  export type AccountOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AccountCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    accountType?: SortOrder
    normalBalance?: SortOrder
    parentId?: SortOrder
    level?: SortOrder
    isPosting?: SortOrder
    allowManualEntry?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountAvgOrderByAggregateInput = {
    level?: SortOrder
    sortOrder?: SortOrder
  }

  export type AccountMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    accountType?: SortOrder
    normalBalance?: SortOrder
    parentId?: SortOrder
    level?: SortOrder
    isPosting?: SortOrder
    allowManualEntry?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    accountType?: SortOrder
    normalBalance?: SortOrder
    parentId?: SortOrder
    level?: SortOrder
    isPosting?: SortOrder
    allowManualEntry?: SortOrder
    isActive?: SortOrder
    sortOrder?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AccountSumOrderByAggregateInput = {
    level?: SortOrder
    sortOrder?: SortOrder
  }

  export type EnumAccountTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccountType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountTypeFilter<$PrismaModel>
    _max?: NestedEnumAccountTypeFilter<$PrismaModel>
  }

  export type EnumNormalBalanceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NormalBalance | EnumNormalBalanceFieldRefInput<$PrismaModel>
    in?: $Enums.NormalBalance[] | ListEnumNormalBalanceFieldRefInput<$PrismaModel>
    notIn?: $Enums.NormalBalance[] | ListEnumNormalBalanceFieldRefInput<$PrismaModel>
    not?: NestedEnumNormalBalanceWithAggregatesFilter<$PrismaModel> | $Enums.NormalBalance
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNormalBalanceFilter<$PrismaModel>
    _max?: NestedEnumNormalBalanceFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumItemTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemType | EnumItemTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ItemType[] | ListEnumItemTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ItemType[] | ListEnumItemTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumItemTypeFilter<$PrismaModel> | $Enums.ItemType
  }

  export type ItemCountOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    itemType?: SortOrder
    unit?: SortOrder
    salePrice?: SortOrder
    purchasePrice?: SortOrder
    vatRate?: SortOrder
    revenueAccountId?: SortOrder
    cogsAccountId?: SortOrder
    inventoryAccountId?: SortOrder
    isTrackedInventory?: SortOrder
    isActive?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemAvgOrderByAggregateInput = {
    salePrice?: SortOrder
    purchasePrice?: SortOrder
    vatRate?: SortOrder
  }

  export type ItemMaxOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    itemType?: SortOrder
    unit?: SortOrder
    salePrice?: SortOrder
    purchasePrice?: SortOrder
    vatRate?: SortOrder
    revenueAccountId?: SortOrder
    cogsAccountId?: SortOrder
    inventoryAccountId?: SortOrder
    isTrackedInventory?: SortOrder
    isActive?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemMinOrderByAggregateInput = {
    id?: SortOrder
    sku?: SortOrder
    name?: SortOrder
    itemType?: SortOrder
    unit?: SortOrder
    salePrice?: SortOrder
    purchasePrice?: SortOrder
    vatRate?: SortOrder
    revenueAccountId?: SortOrder
    cogsAccountId?: SortOrder
    inventoryAccountId?: SortOrder
    isTrackedInventory?: SortOrder
    isActive?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ItemSumOrderByAggregateInput = {
    salePrice?: SortOrder
    purchasePrice?: SortOrder
    vatRate?: SortOrder
  }

  export type EnumItemTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemType | EnumItemTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ItemType[] | ListEnumItemTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ItemType[] | ListEnumItemTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumItemTypeWithAggregatesFilter<$PrismaModel> | $Enums.ItemType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumItemTypeFilter<$PrismaModel>
    _max?: NestedEnumItemTypeFilter<$PrismaModel>
  }

  export type EnumReminderScopeFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderScope | EnumReminderScopeFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderScope[] | ListEnumReminderScopeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReminderScope[] | ListEnumReminderScopeFieldRefInput<$PrismaModel>
    not?: NestedEnumReminderScopeFilter<$PrismaModel> | $Enums.ReminderScope
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type PartnerScalarRelationFilter = {
    is?: PartnerWhereInput
    isNot?: PartnerWhereInput
  }

  export type DebtReminderConfigPartnerIdScopeCompoundUniqueInput = {
    partnerId: string
    scope: $Enums.ReminderScope
  }

  export type DebtReminderConfigCountOrderByAggregateInput = {
    id?: SortOrder
    partnerId?: SortOrder
    scope?: SortOrder
    enabled?: SortOrder
    daysBeforeDue?: SortOrder
    daysAfterDue?: SortOrder
    recipientEmail?: SortOrder
    ccEmails?: SortOrder
    lastSentAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DebtReminderConfigAvgOrderByAggregateInput = {
    daysBeforeDue?: SortOrder
    daysAfterDue?: SortOrder
  }

  export type DebtReminderConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    partnerId?: SortOrder
    scope?: SortOrder
    enabled?: SortOrder
    daysBeforeDue?: SortOrder
    daysAfterDue?: SortOrder
    recipientEmail?: SortOrder
    lastSentAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DebtReminderConfigMinOrderByAggregateInput = {
    id?: SortOrder
    partnerId?: SortOrder
    scope?: SortOrder
    enabled?: SortOrder
    daysBeforeDue?: SortOrder
    daysAfterDue?: SortOrder
    recipientEmail?: SortOrder
    lastSentAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DebtReminderConfigSumOrderByAggregateInput = {
    daysBeforeDue?: SortOrder
    daysAfterDue?: SortOrder
  }

  export type EnumReminderScopeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderScope | EnumReminderScopeFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderScope[] | ListEnumReminderScopeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReminderScope[] | ListEnumReminderScopeFieldRefInput<$PrismaModel>
    not?: NestedEnumReminderScopeWithAggregatesFilter<$PrismaModel> | $Enums.ReminderScope
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReminderScopeFilter<$PrismaModel>
    _max?: NestedEnumReminderScopeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumReminderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderStatus | EnumReminderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderStatus[] | ListEnumReminderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReminderStatus[] | ListEnumReminderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReminderStatusFilter<$PrismaModel> | $Enums.ReminderStatus
  }

  export type DebtReminderLogCountOrderByAggregateInput = {
    id?: SortOrder
    partnerId?: SortOrder
    scope?: SortOrder
    invoiceRef?: SortOrder
    recipientEmail?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    scheduledAt?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DebtReminderLogAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DebtReminderLogMaxOrderByAggregateInput = {
    id?: SortOrder
    partnerId?: SortOrder
    scope?: SortOrder
    invoiceRef?: SortOrder
    recipientEmail?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    scheduledAt?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DebtReminderLogMinOrderByAggregateInput = {
    id?: SortOrder
    partnerId?: SortOrder
    scope?: SortOrder
    invoiceRef?: SortOrder
    recipientEmail?: SortOrder
    subject?: SortOrder
    status?: SortOrder
    errorMessage?: SortOrder
    scheduledAt?: SortOrder
    sentAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DebtReminderLogSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumReminderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderStatus | EnumReminderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderStatus[] | ListEnumReminderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReminderStatus[] | ListEnumReminderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReminderStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReminderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReminderStatusFilter<$PrismaModel>
    _max?: NestedEnumReminderStatusFilter<$PrismaModel>
  }

  export type AuthAuditLogCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthAuditLogCreateWithoutUserInput, AuthAuditLogUncheckedCreateWithoutUserInput> | AuthAuditLogCreateWithoutUserInput[] | AuthAuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthAuditLogCreateOrConnectWithoutUserInput | AuthAuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuthAuditLogCreateManyUserInputEnvelope
    connect?: AuthAuditLogWhereUniqueInput | AuthAuditLogWhereUniqueInput[]
  }

  export type AuthAuditLogUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AuthAuditLogCreateWithoutUserInput, AuthAuditLogUncheckedCreateWithoutUserInput> | AuthAuditLogCreateWithoutUserInput[] | AuthAuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthAuditLogCreateOrConnectWithoutUserInput | AuthAuditLogCreateOrConnectWithoutUserInput[]
    createMany?: AuthAuditLogCreateManyUserInputEnvelope
    connect?: AuthAuditLogWhereUniqueInput | AuthAuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumAuthUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.AuthUserRole
  }

  export type EnumAuthProviderFieldUpdateOperationsInput = {
    set?: $Enums.AuthProvider
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AuthAuditLogUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthAuditLogCreateWithoutUserInput, AuthAuditLogUncheckedCreateWithoutUserInput> | AuthAuditLogCreateWithoutUserInput[] | AuthAuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthAuditLogCreateOrConnectWithoutUserInput | AuthAuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuthAuditLogUpsertWithWhereUniqueWithoutUserInput | AuthAuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthAuditLogCreateManyUserInputEnvelope
    set?: AuthAuditLogWhereUniqueInput | AuthAuditLogWhereUniqueInput[]
    disconnect?: AuthAuditLogWhereUniqueInput | AuthAuditLogWhereUniqueInput[]
    delete?: AuthAuditLogWhereUniqueInput | AuthAuditLogWhereUniqueInput[]
    connect?: AuthAuditLogWhereUniqueInput | AuthAuditLogWhereUniqueInput[]
    update?: AuthAuditLogUpdateWithWhereUniqueWithoutUserInput | AuthAuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthAuditLogUpdateManyWithWhereWithoutUserInput | AuthAuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthAuditLogScalarWhereInput | AuthAuditLogScalarWhereInput[]
  }

  export type AuthAuditLogUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AuthAuditLogCreateWithoutUserInput, AuthAuditLogUncheckedCreateWithoutUserInput> | AuthAuditLogCreateWithoutUserInput[] | AuthAuditLogUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AuthAuditLogCreateOrConnectWithoutUserInput | AuthAuditLogCreateOrConnectWithoutUserInput[]
    upsert?: AuthAuditLogUpsertWithWhereUniqueWithoutUserInput | AuthAuditLogUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AuthAuditLogCreateManyUserInputEnvelope
    set?: AuthAuditLogWhereUniqueInput | AuthAuditLogWhereUniqueInput[]
    disconnect?: AuthAuditLogWhereUniqueInput | AuthAuditLogWhereUniqueInput[]
    delete?: AuthAuditLogWhereUniqueInput | AuthAuditLogWhereUniqueInput[]
    connect?: AuthAuditLogWhereUniqueInput | AuthAuditLogWhereUniqueInput[]
    update?: AuthAuditLogUpdateWithWhereUniqueWithoutUserInput | AuthAuditLogUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AuthAuditLogUpdateManyWithWhereWithoutUserInput | AuthAuditLogUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AuthAuditLogScalarWhereInput | AuthAuditLogScalarWhereInput[]
  }

  export type UserProfileCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserProfileCreateWithoutAuditLogsInput, UserProfileUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutAuditLogsInput
    connect?: UserProfileWhereUniqueInput
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableEnumAuthProviderFieldUpdateOperationsInput = {
    set?: $Enums.AuthProvider | null
  }

  export type NullableEnumAuthUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.AuthUserRole | null
  }

  export type UserProfileUpdateOneWithoutAuditLogsNestedInput = {
    create?: XOR<UserProfileCreateWithoutAuditLogsInput, UserProfileUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutAuditLogsInput
    upsert?: UserProfileUpsertWithoutAuditLogsInput
    disconnect?: UserProfileWhereInput | boolean
    delete?: UserProfileWhereInput | boolean
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutAuditLogsInput, UserProfileUpdateWithoutAuditLogsInput>, UserProfileUncheckedUpdateWithoutAuditLogsInput>
  }

  export type DebtReminderConfigCreateNestedManyWithoutPartnerInput = {
    create?: XOR<DebtReminderConfigCreateWithoutPartnerInput, DebtReminderConfigUncheckedCreateWithoutPartnerInput> | DebtReminderConfigCreateWithoutPartnerInput[] | DebtReminderConfigUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: DebtReminderConfigCreateOrConnectWithoutPartnerInput | DebtReminderConfigCreateOrConnectWithoutPartnerInput[]
    createMany?: DebtReminderConfigCreateManyPartnerInputEnvelope
    connect?: DebtReminderConfigWhereUniqueInput | DebtReminderConfigWhereUniqueInput[]
  }

  export type DebtReminderLogCreateNestedManyWithoutPartnerInput = {
    create?: XOR<DebtReminderLogCreateWithoutPartnerInput, DebtReminderLogUncheckedCreateWithoutPartnerInput> | DebtReminderLogCreateWithoutPartnerInput[] | DebtReminderLogUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: DebtReminderLogCreateOrConnectWithoutPartnerInput | DebtReminderLogCreateOrConnectWithoutPartnerInput[]
    createMany?: DebtReminderLogCreateManyPartnerInputEnvelope
    connect?: DebtReminderLogWhereUniqueInput | DebtReminderLogWhereUniqueInput[]
  }

  export type DebtReminderConfigUncheckedCreateNestedManyWithoutPartnerInput = {
    create?: XOR<DebtReminderConfigCreateWithoutPartnerInput, DebtReminderConfigUncheckedCreateWithoutPartnerInput> | DebtReminderConfigCreateWithoutPartnerInput[] | DebtReminderConfigUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: DebtReminderConfigCreateOrConnectWithoutPartnerInput | DebtReminderConfigCreateOrConnectWithoutPartnerInput[]
    createMany?: DebtReminderConfigCreateManyPartnerInputEnvelope
    connect?: DebtReminderConfigWhereUniqueInput | DebtReminderConfigWhereUniqueInput[]
  }

  export type DebtReminderLogUncheckedCreateNestedManyWithoutPartnerInput = {
    create?: XOR<DebtReminderLogCreateWithoutPartnerInput, DebtReminderLogUncheckedCreateWithoutPartnerInput> | DebtReminderLogCreateWithoutPartnerInput[] | DebtReminderLogUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: DebtReminderLogCreateOrConnectWithoutPartnerInput | DebtReminderLogCreateOrConnectWithoutPartnerInput[]
    createMany?: DebtReminderLogCreateManyPartnerInputEnvelope
    connect?: DebtReminderLogWhereUniqueInput | DebtReminderLogWhereUniqueInput[]
  }

  export type EnumPartnerTypeFieldUpdateOperationsInput = {
    set?: $Enums.PartnerType
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type DebtReminderConfigUpdateManyWithoutPartnerNestedInput = {
    create?: XOR<DebtReminderConfigCreateWithoutPartnerInput, DebtReminderConfigUncheckedCreateWithoutPartnerInput> | DebtReminderConfigCreateWithoutPartnerInput[] | DebtReminderConfigUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: DebtReminderConfigCreateOrConnectWithoutPartnerInput | DebtReminderConfigCreateOrConnectWithoutPartnerInput[]
    upsert?: DebtReminderConfigUpsertWithWhereUniqueWithoutPartnerInput | DebtReminderConfigUpsertWithWhereUniqueWithoutPartnerInput[]
    createMany?: DebtReminderConfigCreateManyPartnerInputEnvelope
    set?: DebtReminderConfigWhereUniqueInput | DebtReminderConfigWhereUniqueInput[]
    disconnect?: DebtReminderConfigWhereUniqueInput | DebtReminderConfigWhereUniqueInput[]
    delete?: DebtReminderConfigWhereUniqueInput | DebtReminderConfigWhereUniqueInput[]
    connect?: DebtReminderConfigWhereUniqueInput | DebtReminderConfigWhereUniqueInput[]
    update?: DebtReminderConfigUpdateWithWhereUniqueWithoutPartnerInput | DebtReminderConfigUpdateWithWhereUniqueWithoutPartnerInput[]
    updateMany?: DebtReminderConfigUpdateManyWithWhereWithoutPartnerInput | DebtReminderConfigUpdateManyWithWhereWithoutPartnerInput[]
    deleteMany?: DebtReminderConfigScalarWhereInput | DebtReminderConfigScalarWhereInput[]
  }

  export type DebtReminderLogUpdateManyWithoutPartnerNestedInput = {
    create?: XOR<DebtReminderLogCreateWithoutPartnerInput, DebtReminderLogUncheckedCreateWithoutPartnerInput> | DebtReminderLogCreateWithoutPartnerInput[] | DebtReminderLogUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: DebtReminderLogCreateOrConnectWithoutPartnerInput | DebtReminderLogCreateOrConnectWithoutPartnerInput[]
    upsert?: DebtReminderLogUpsertWithWhereUniqueWithoutPartnerInput | DebtReminderLogUpsertWithWhereUniqueWithoutPartnerInput[]
    createMany?: DebtReminderLogCreateManyPartnerInputEnvelope
    set?: DebtReminderLogWhereUniqueInput | DebtReminderLogWhereUniqueInput[]
    disconnect?: DebtReminderLogWhereUniqueInput | DebtReminderLogWhereUniqueInput[]
    delete?: DebtReminderLogWhereUniqueInput | DebtReminderLogWhereUniqueInput[]
    connect?: DebtReminderLogWhereUniqueInput | DebtReminderLogWhereUniqueInput[]
    update?: DebtReminderLogUpdateWithWhereUniqueWithoutPartnerInput | DebtReminderLogUpdateWithWhereUniqueWithoutPartnerInput[]
    updateMany?: DebtReminderLogUpdateManyWithWhereWithoutPartnerInput | DebtReminderLogUpdateManyWithWhereWithoutPartnerInput[]
    deleteMany?: DebtReminderLogScalarWhereInput | DebtReminderLogScalarWhereInput[]
  }

  export type DebtReminderConfigUncheckedUpdateManyWithoutPartnerNestedInput = {
    create?: XOR<DebtReminderConfigCreateWithoutPartnerInput, DebtReminderConfigUncheckedCreateWithoutPartnerInput> | DebtReminderConfigCreateWithoutPartnerInput[] | DebtReminderConfigUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: DebtReminderConfigCreateOrConnectWithoutPartnerInput | DebtReminderConfigCreateOrConnectWithoutPartnerInput[]
    upsert?: DebtReminderConfigUpsertWithWhereUniqueWithoutPartnerInput | DebtReminderConfigUpsertWithWhereUniqueWithoutPartnerInput[]
    createMany?: DebtReminderConfigCreateManyPartnerInputEnvelope
    set?: DebtReminderConfigWhereUniqueInput | DebtReminderConfigWhereUniqueInput[]
    disconnect?: DebtReminderConfigWhereUniqueInput | DebtReminderConfigWhereUniqueInput[]
    delete?: DebtReminderConfigWhereUniqueInput | DebtReminderConfigWhereUniqueInput[]
    connect?: DebtReminderConfigWhereUniqueInput | DebtReminderConfigWhereUniqueInput[]
    update?: DebtReminderConfigUpdateWithWhereUniqueWithoutPartnerInput | DebtReminderConfigUpdateWithWhereUniqueWithoutPartnerInput[]
    updateMany?: DebtReminderConfigUpdateManyWithWhereWithoutPartnerInput | DebtReminderConfigUpdateManyWithWhereWithoutPartnerInput[]
    deleteMany?: DebtReminderConfigScalarWhereInput | DebtReminderConfigScalarWhereInput[]
  }

  export type DebtReminderLogUncheckedUpdateManyWithoutPartnerNestedInput = {
    create?: XOR<DebtReminderLogCreateWithoutPartnerInput, DebtReminderLogUncheckedCreateWithoutPartnerInput> | DebtReminderLogCreateWithoutPartnerInput[] | DebtReminderLogUncheckedCreateWithoutPartnerInput[]
    connectOrCreate?: DebtReminderLogCreateOrConnectWithoutPartnerInput | DebtReminderLogCreateOrConnectWithoutPartnerInput[]
    upsert?: DebtReminderLogUpsertWithWhereUniqueWithoutPartnerInput | DebtReminderLogUpsertWithWhereUniqueWithoutPartnerInput[]
    createMany?: DebtReminderLogCreateManyPartnerInputEnvelope
    set?: DebtReminderLogWhereUniqueInput | DebtReminderLogWhereUniqueInput[]
    disconnect?: DebtReminderLogWhereUniqueInput | DebtReminderLogWhereUniqueInput[]
    delete?: DebtReminderLogWhereUniqueInput | DebtReminderLogWhereUniqueInput[]
    connect?: DebtReminderLogWhereUniqueInput | DebtReminderLogWhereUniqueInput[]
    update?: DebtReminderLogUpdateWithWhereUniqueWithoutPartnerInput | DebtReminderLogUpdateWithWhereUniqueWithoutPartnerInput[]
    updateMany?: DebtReminderLogUpdateManyWithWhereWithoutPartnerInput | DebtReminderLogUpdateManyWithWhereWithoutPartnerInput[]
    deleteMany?: DebtReminderLogScalarWhereInput | DebtReminderLogScalarWhereInput[]
  }

  export type AccountCreateNestedOneWithoutChildrenInput = {
    create?: XOR<AccountCreateWithoutChildrenInput, AccountUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: AccountCreateOrConnectWithoutChildrenInput
    connect?: AccountWhereUniqueInput
  }

  export type AccountCreateNestedManyWithoutParentInput = {
    create?: XOR<AccountCreateWithoutParentInput, AccountUncheckedCreateWithoutParentInput> | AccountCreateWithoutParentInput[] | AccountUncheckedCreateWithoutParentInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutParentInput | AccountCreateOrConnectWithoutParentInput[]
    createMany?: AccountCreateManyParentInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type ItemCreateNestedManyWithoutRevenueAccountInput = {
    create?: XOR<ItemCreateWithoutRevenueAccountInput, ItemUncheckedCreateWithoutRevenueAccountInput> | ItemCreateWithoutRevenueAccountInput[] | ItemUncheckedCreateWithoutRevenueAccountInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutRevenueAccountInput | ItemCreateOrConnectWithoutRevenueAccountInput[]
    createMany?: ItemCreateManyRevenueAccountInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type ItemCreateNestedManyWithoutCogsAccountInput = {
    create?: XOR<ItemCreateWithoutCogsAccountInput, ItemUncheckedCreateWithoutCogsAccountInput> | ItemCreateWithoutCogsAccountInput[] | ItemUncheckedCreateWithoutCogsAccountInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutCogsAccountInput | ItemCreateOrConnectWithoutCogsAccountInput[]
    createMany?: ItemCreateManyCogsAccountInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type ItemCreateNestedManyWithoutInventoryAccountInput = {
    create?: XOR<ItemCreateWithoutInventoryAccountInput, ItemUncheckedCreateWithoutInventoryAccountInput> | ItemCreateWithoutInventoryAccountInput[] | ItemUncheckedCreateWithoutInventoryAccountInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutInventoryAccountInput | ItemCreateOrConnectWithoutInventoryAccountInput[]
    createMany?: ItemCreateManyInventoryAccountInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type AccountUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<AccountCreateWithoutParentInput, AccountUncheckedCreateWithoutParentInput> | AccountCreateWithoutParentInput[] | AccountUncheckedCreateWithoutParentInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutParentInput | AccountCreateOrConnectWithoutParentInput[]
    createMany?: AccountCreateManyParentInputEnvelope
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
  }

  export type ItemUncheckedCreateNestedManyWithoutRevenueAccountInput = {
    create?: XOR<ItemCreateWithoutRevenueAccountInput, ItemUncheckedCreateWithoutRevenueAccountInput> | ItemCreateWithoutRevenueAccountInput[] | ItemUncheckedCreateWithoutRevenueAccountInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutRevenueAccountInput | ItemCreateOrConnectWithoutRevenueAccountInput[]
    createMany?: ItemCreateManyRevenueAccountInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type ItemUncheckedCreateNestedManyWithoutCogsAccountInput = {
    create?: XOR<ItemCreateWithoutCogsAccountInput, ItemUncheckedCreateWithoutCogsAccountInput> | ItemCreateWithoutCogsAccountInput[] | ItemUncheckedCreateWithoutCogsAccountInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutCogsAccountInput | ItemCreateOrConnectWithoutCogsAccountInput[]
    createMany?: ItemCreateManyCogsAccountInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type ItemUncheckedCreateNestedManyWithoutInventoryAccountInput = {
    create?: XOR<ItemCreateWithoutInventoryAccountInput, ItemUncheckedCreateWithoutInventoryAccountInput> | ItemCreateWithoutInventoryAccountInput[] | ItemUncheckedCreateWithoutInventoryAccountInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutInventoryAccountInput | ItemCreateOrConnectWithoutInventoryAccountInput[]
    createMany?: ItemCreateManyInventoryAccountInputEnvelope
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
  }

  export type EnumAccountTypeFieldUpdateOperationsInput = {
    set?: $Enums.AccountType
  }

  export type EnumNormalBalanceFieldUpdateOperationsInput = {
    set?: $Enums.NormalBalance
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AccountUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<AccountCreateWithoutChildrenInput, AccountUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: AccountCreateOrConnectWithoutChildrenInput
    upsert?: AccountUpsertWithoutChildrenInput
    disconnect?: AccountWhereInput | boolean
    delete?: AccountWhereInput | boolean
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutChildrenInput, AccountUpdateWithoutChildrenInput>, AccountUncheckedUpdateWithoutChildrenInput>
  }

  export type AccountUpdateManyWithoutParentNestedInput = {
    create?: XOR<AccountCreateWithoutParentInput, AccountUncheckedCreateWithoutParentInput> | AccountCreateWithoutParentInput[] | AccountUncheckedCreateWithoutParentInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutParentInput | AccountCreateOrConnectWithoutParentInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutParentInput | AccountUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: AccountCreateManyParentInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutParentInput | AccountUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutParentInput | AccountUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type ItemUpdateManyWithoutRevenueAccountNestedInput = {
    create?: XOR<ItemCreateWithoutRevenueAccountInput, ItemUncheckedCreateWithoutRevenueAccountInput> | ItemCreateWithoutRevenueAccountInput[] | ItemUncheckedCreateWithoutRevenueAccountInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutRevenueAccountInput | ItemCreateOrConnectWithoutRevenueAccountInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutRevenueAccountInput | ItemUpsertWithWhereUniqueWithoutRevenueAccountInput[]
    createMany?: ItemCreateManyRevenueAccountInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutRevenueAccountInput | ItemUpdateWithWhereUniqueWithoutRevenueAccountInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutRevenueAccountInput | ItemUpdateManyWithWhereWithoutRevenueAccountInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type ItemUpdateManyWithoutCogsAccountNestedInput = {
    create?: XOR<ItemCreateWithoutCogsAccountInput, ItemUncheckedCreateWithoutCogsAccountInput> | ItemCreateWithoutCogsAccountInput[] | ItemUncheckedCreateWithoutCogsAccountInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutCogsAccountInput | ItemCreateOrConnectWithoutCogsAccountInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutCogsAccountInput | ItemUpsertWithWhereUniqueWithoutCogsAccountInput[]
    createMany?: ItemCreateManyCogsAccountInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutCogsAccountInput | ItemUpdateWithWhereUniqueWithoutCogsAccountInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutCogsAccountInput | ItemUpdateManyWithWhereWithoutCogsAccountInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type ItemUpdateManyWithoutInventoryAccountNestedInput = {
    create?: XOR<ItemCreateWithoutInventoryAccountInput, ItemUncheckedCreateWithoutInventoryAccountInput> | ItemCreateWithoutInventoryAccountInput[] | ItemUncheckedCreateWithoutInventoryAccountInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutInventoryAccountInput | ItemCreateOrConnectWithoutInventoryAccountInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutInventoryAccountInput | ItemUpsertWithWhereUniqueWithoutInventoryAccountInput[]
    createMany?: ItemCreateManyInventoryAccountInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutInventoryAccountInput | ItemUpdateWithWhereUniqueWithoutInventoryAccountInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutInventoryAccountInput | ItemUpdateManyWithWhereWithoutInventoryAccountInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type AccountUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<AccountCreateWithoutParentInput, AccountUncheckedCreateWithoutParentInput> | AccountCreateWithoutParentInput[] | AccountUncheckedCreateWithoutParentInput[]
    connectOrCreate?: AccountCreateOrConnectWithoutParentInput | AccountCreateOrConnectWithoutParentInput[]
    upsert?: AccountUpsertWithWhereUniqueWithoutParentInput | AccountUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: AccountCreateManyParentInputEnvelope
    set?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    disconnect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    delete?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    connect?: AccountWhereUniqueInput | AccountWhereUniqueInput[]
    update?: AccountUpdateWithWhereUniqueWithoutParentInput | AccountUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: AccountUpdateManyWithWhereWithoutParentInput | AccountUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: AccountScalarWhereInput | AccountScalarWhereInput[]
  }

  export type ItemUncheckedUpdateManyWithoutRevenueAccountNestedInput = {
    create?: XOR<ItemCreateWithoutRevenueAccountInput, ItemUncheckedCreateWithoutRevenueAccountInput> | ItemCreateWithoutRevenueAccountInput[] | ItemUncheckedCreateWithoutRevenueAccountInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutRevenueAccountInput | ItemCreateOrConnectWithoutRevenueAccountInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutRevenueAccountInput | ItemUpsertWithWhereUniqueWithoutRevenueAccountInput[]
    createMany?: ItemCreateManyRevenueAccountInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutRevenueAccountInput | ItemUpdateWithWhereUniqueWithoutRevenueAccountInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutRevenueAccountInput | ItemUpdateManyWithWhereWithoutRevenueAccountInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type ItemUncheckedUpdateManyWithoutCogsAccountNestedInput = {
    create?: XOR<ItemCreateWithoutCogsAccountInput, ItemUncheckedCreateWithoutCogsAccountInput> | ItemCreateWithoutCogsAccountInput[] | ItemUncheckedCreateWithoutCogsAccountInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutCogsAccountInput | ItemCreateOrConnectWithoutCogsAccountInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutCogsAccountInput | ItemUpsertWithWhereUniqueWithoutCogsAccountInput[]
    createMany?: ItemCreateManyCogsAccountInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutCogsAccountInput | ItemUpdateWithWhereUniqueWithoutCogsAccountInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutCogsAccountInput | ItemUpdateManyWithWhereWithoutCogsAccountInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type ItemUncheckedUpdateManyWithoutInventoryAccountNestedInput = {
    create?: XOR<ItemCreateWithoutInventoryAccountInput, ItemUncheckedCreateWithoutInventoryAccountInput> | ItemCreateWithoutInventoryAccountInput[] | ItemUncheckedCreateWithoutInventoryAccountInput[]
    connectOrCreate?: ItemCreateOrConnectWithoutInventoryAccountInput | ItemCreateOrConnectWithoutInventoryAccountInput[]
    upsert?: ItemUpsertWithWhereUniqueWithoutInventoryAccountInput | ItemUpsertWithWhereUniqueWithoutInventoryAccountInput[]
    createMany?: ItemCreateManyInventoryAccountInputEnvelope
    set?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    disconnect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    delete?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    connect?: ItemWhereUniqueInput | ItemWhereUniqueInput[]
    update?: ItemUpdateWithWhereUniqueWithoutInventoryAccountInput | ItemUpdateWithWhereUniqueWithoutInventoryAccountInput[]
    updateMany?: ItemUpdateManyWithWhereWithoutInventoryAccountInput | ItemUpdateManyWithWhereWithoutInventoryAccountInput[]
    deleteMany?: ItemScalarWhereInput | ItemScalarWhereInput[]
  }

  export type AccountCreateNestedOneWithoutRevenueItemsInput = {
    create?: XOR<AccountCreateWithoutRevenueItemsInput, AccountUncheckedCreateWithoutRevenueItemsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutRevenueItemsInput
    connect?: AccountWhereUniqueInput
  }

  export type AccountCreateNestedOneWithoutCogsItemsInput = {
    create?: XOR<AccountCreateWithoutCogsItemsInput, AccountUncheckedCreateWithoutCogsItemsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutCogsItemsInput
    connect?: AccountWhereUniqueInput
  }

  export type AccountCreateNestedOneWithoutInventoryItemsInput = {
    create?: XOR<AccountCreateWithoutInventoryItemsInput, AccountUncheckedCreateWithoutInventoryItemsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutInventoryItemsInput
    connect?: AccountWhereUniqueInput
  }

  export type EnumItemTypeFieldUpdateOperationsInput = {
    set?: $Enums.ItemType
  }

  export type AccountUpdateOneWithoutRevenueItemsNestedInput = {
    create?: XOR<AccountCreateWithoutRevenueItemsInput, AccountUncheckedCreateWithoutRevenueItemsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutRevenueItemsInput
    upsert?: AccountUpsertWithoutRevenueItemsInput
    disconnect?: AccountWhereInput | boolean
    delete?: AccountWhereInput | boolean
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutRevenueItemsInput, AccountUpdateWithoutRevenueItemsInput>, AccountUncheckedUpdateWithoutRevenueItemsInput>
  }

  export type AccountUpdateOneWithoutCogsItemsNestedInput = {
    create?: XOR<AccountCreateWithoutCogsItemsInput, AccountUncheckedCreateWithoutCogsItemsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutCogsItemsInput
    upsert?: AccountUpsertWithoutCogsItemsInput
    disconnect?: AccountWhereInput | boolean
    delete?: AccountWhereInput | boolean
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutCogsItemsInput, AccountUpdateWithoutCogsItemsInput>, AccountUncheckedUpdateWithoutCogsItemsInput>
  }

  export type AccountUpdateOneWithoutInventoryItemsNestedInput = {
    create?: XOR<AccountCreateWithoutInventoryItemsInput, AccountUncheckedCreateWithoutInventoryItemsInput>
    connectOrCreate?: AccountCreateOrConnectWithoutInventoryItemsInput
    upsert?: AccountUpsertWithoutInventoryItemsInput
    disconnect?: AccountWhereInput | boolean
    delete?: AccountWhereInput | boolean
    connect?: AccountWhereUniqueInput
    update?: XOR<XOR<AccountUpdateToOneWithWhereWithoutInventoryItemsInput, AccountUpdateWithoutInventoryItemsInput>, AccountUncheckedUpdateWithoutInventoryItemsInput>
  }

  export type PartnerCreateNestedOneWithoutDebtRemindersInput = {
    create?: XOR<PartnerCreateWithoutDebtRemindersInput, PartnerUncheckedCreateWithoutDebtRemindersInput>
    connectOrCreate?: PartnerCreateOrConnectWithoutDebtRemindersInput
    connect?: PartnerWhereUniqueInput
  }

  export type EnumReminderScopeFieldUpdateOperationsInput = {
    set?: $Enums.ReminderScope
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type PartnerUpdateOneRequiredWithoutDebtRemindersNestedInput = {
    create?: XOR<PartnerCreateWithoutDebtRemindersInput, PartnerUncheckedCreateWithoutDebtRemindersInput>
    connectOrCreate?: PartnerCreateOrConnectWithoutDebtRemindersInput
    upsert?: PartnerUpsertWithoutDebtRemindersInput
    connect?: PartnerWhereUniqueInput
    update?: XOR<XOR<PartnerUpdateToOneWithWhereWithoutDebtRemindersInput, PartnerUpdateWithoutDebtRemindersInput>, PartnerUncheckedUpdateWithoutDebtRemindersInput>
  }

  export type PartnerCreateNestedOneWithoutDebtReminderLogsInput = {
    create?: XOR<PartnerCreateWithoutDebtReminderLogsInput, PartnerUncheckedCreateWithoutDebtReminderLogsInput>
    connectOrCreate?: PartnerCreateOrConnectWithoutDebtReminderLogsInput
    connect?: PartnerWhereUniqueInput
  }

  export type EnumReminderStatusFieldUpdateOperationsInput = {
    set?: $Enums.ReminderStatus
  }

  export type PartnerUpdateOneRequiredWithoutDebtReminderLogsNestedInput = {
    create?: XOR<PartnerCreateWithoutDebtReminderLogsInput, PartnerUncheckedCreateWithoutDebtReminderLogsInput>
    connectOrCreate?: PartnerCreateOrConnectWithoutDebtReminderLogsInput
    upsert?: PartnerUpsertWithoutDebtReminderLogsInput
    connect?: PartnerWhereUniqueInput
    update?: XOR<XOR<PartnerUpdateToOneWithWhereWithoutDebtReminderLogsInput, PartnerUpdateWithoutDebtReminderLogsInput>, PartnerUncheckedUpdateWithoutDebtReminderLogsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumAuthUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthUserRole | EnumAuthUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AuthUserRole[] | ListEnumAuthUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthUserRole[] | ListEnumAuthUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthUserRoleFilter<$PrismaModel> | $Enums.AuthUserRole
  }

  export type NestedEnumAuthProviderFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderFilter<$PrismaModel> | $Enums.AuthProvider
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAuthUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthUserRole | EnumAuthUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.AuthUserRole[] | ListEnumAuthUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthUserRole[] | ListEnumAuthUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.AuthUserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthUserRoleFilter<$PrismaModel>
    _max?: NestedEnumAuthUserRoleFilter<$PrismaModel>
  }

  export type NestedEnumAuthProviderWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel>
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthProviderWithAggregatesFilter<$PrismaModel> | $Enums.AuthProvider
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthProviderFilter<$PrismaModel>
    _max?: NestedEnumAuthProviderFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedUuidNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumAuthProviderNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel> | null
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAuthProviderNullableFilter<$PrismaModel> | $Enums.AuthProvider | null
  }

  export type NestedEnumAuthUserRoleNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthUserRole | EnumAuthUserRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.AuthUserRole[] | ListEnumAuthUserRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AuthUserRole[] | ListEnumAuthUserRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAuthUserRoleNullableFilter<$PrismaModel> | $Enums.AuthUserRole | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedUuidNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumAuthProviderNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthProvider | EnumAuthProviderFieldRefInput<$PrismaModel> | null
    in?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AuthProvider[] | ListEnumAuthProviderFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAuthProviderNullableWithAggregatesFilter<$PrismaModel> | $Enums.AuthProvider | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAuthProviderNullableFilter<$PrismaModel>
    _max?: NestedEnumAuthProviderNullableFilter<$PrismaModel>
  }

  export type NestedEnumAuthUserRoleNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthUserRole | EnumAuthUserRoleFieldRefInput<$PrismaModel> | null
    in?: $Enums.AuthUserRole[] | ListEnumAuthUserRoleFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.AuthUserRole[] | ListEnumAuthUserRoleFieldRefInput<$PrismaModel> | null
    not?: NestedEnumAuthUserRoleNullableWithAggregatesFilter<$PrismaModel> | $Enums.AuthUserRole | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumAuthUserRoleNullableFilter<$PrismaModel>
    _max?: NestedEnumAuthUserRoleNullableFilter<$PrismaModel>
  }

  export type NestedEnumPartnerTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PartnerType | EnumPartnerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPartnerTypeFilter<$PrismaModel> | $Enums.PartnerType
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedEnumPartnerTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PartnerType | EnumPartnerTypeFieldRefInput<$PrismaModel>
    in?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.PartnerType[] | ListEnumPartnerTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumPartnerTypeWithAggregatesFilter<$PrismaModel> | $Enums.PartnerType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPartnerTypeFilter<$PrismaModel>
    _max?: NestedEnumPartnerTypeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel> | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumAccountTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeFilter<$PrismaModel> | $Enums.AccountType
  }

  export type NestedEnumNormalBalanceFilter<$PrismaModel = never> = {
    equals?: $Enums.NormalBalance | EnumNormalBalanceFieldRefInput<$PrismaModel>
    in?: $Enums.NormalBalance[] | ListEnumNormalBalanceFieldRefInput<$PrismaModel>
    notIn?: $Enums.NormalBalance[] | ListEnumNormalBalanceFieldRefInput<$PrismaModel>
    not?: NestedEnumNormalBalanceFilter<$PrismaModel> | $Enums.NormalBalance
  }

  export type NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AccountType | EnumAccountTypeFieldRefInput<$PrismaModel>
    in?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.AccountType[] | ListEnumAccountTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumAccountTypeWithAggregatesFilter<$PrismaModel> | $Enums.AccountType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAccountTypeFilter<$PrismaModel>
    _max?: NestedEnumAccountTypeFilter<$PrismaModel>
  }

  export type NestedEnumNormalBalanceWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NormalBalance | EnumNormalBalanceFieldRefInput<$PrismaModel>
    in?: $Enums.NormalBalance[] | ListEnumNormalBalanceFieldRefInput<$PrismaModel>
    notIn?: $Enums.NormalBalance[] | ListEnumNormalBalanceFieldRefInput<$PrismaModel>
    not?: NestedEnumNormalBalanceWithAggregatesFilter<$PrismaModel> | $Enums.NormalBalance
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNormalBalanceFilter<$PrismaModel>
    _max?: NestedEnumNormalBalanceFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedEnumItemTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemType | EnumItemTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ItemType[] | ListEnumItemTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ItemType[] | ListEnumItemTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumItemTypeFilter<$PrismaModel> | $Enums.ItemType
  }

  export type NestedEnumItemTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ItemType | EnumItemTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ItemType[] | ListEnumItemTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ItemType[] | ListEnumItemTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumItemTypeWithAggregatesFilter<$PrismaModel> | $Enums.ItemType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumItemTypeFilter<$PrismaModel>
    _max?: NestedEnumItemTypeFilter<$PrismaModel>
  }

  export type NestedEnumReminderScopeFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderScope | EnumReminderScopeFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderScope[] | ListEnumReminderScopeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReminderScope[] | ListEnumReminderScopeFieldRefInput<$PrismaModel>
    not?: NestedEnumReminderScopeFilter<$PrismaModel> | $Enums.ReminderScope
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumReminderScopeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderScope | EnumReminderScopeFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderScope[] | ListEnumReminderScopeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReminderScope[] | ListEnumReminderScopeFieldRefInput<$PrismaModel>
    not?: NestedEnumReminderScopeWithAggregatesFilter<$PrismaModel> | $Enums.ReminderScope
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReminderScopeFilter<$PrismaModel>
    _max?: NestedEnumReminderScopeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumReminderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderStatus | EnumReminderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderStatus[] | ListEnumReminderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReminderStatus[] | ListEnumReminderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReminderStatusFilter<$PrismaModel> | $Enums.ReminderStatus
  }

  export type NestedEnumReminderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReminderStatus | EnumReminderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ReminderStatus[] | ListEnumReminderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReminderStatus[] | ListEnumReminderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumReminderStatusWithAggregatesFilter<$PrismaModel> | $Enums.ReminderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReminderStatusFilter<$PrismaModel>
    _max?: NestedEnumReminderStatusFilter<$PrismaModel>
  }

  export type AuthAuditLogCreateWithoutUserInput = {
    id?: bigint | number
    email?: string | null
    action: string
    success: boolean
    message?: string | null
    provider?: $Enums.AuthProvider | null
    role?: $Enums.AuthUserRole | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type AuthAuditLogUncheckedCreateWithoutUserInput = {
    id?: bigint | number
    email?: string | null
    action: string
    success: boolean
    message?: string | null
    provider?: $Enums.AuthProvider | null
    role?: $Enums.AuthUserRole | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type AuthAuditLogCreateOrConnectWithoutUserInput = {
    where: AuthAuditLogWhereUniqueInput
    create: XOR<AuthAuditLogCreateWithoutUserInput, AuthAuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuthAuditLogCreateManyUserInputEnvelope = {
    data: AuthAuditLogCreateManyUserInput | AuthAuditLogCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type AuthAuditLogUpsertWithWhereUniqueWithoutUserInput = {
    where: AuthAuditLogWhereUniqueInput
    update: XOR<AuthAuditLogUpdateWithoutUserInput, AuthAuditLogUncheckedUpdateWithoutUserInput>
    create: XOR<AuthAuditLogCreateWithoutUserInput, AuthAuditLogUncheckedCreateWithoutUserInput>
  }

  export type AuthAuditLogUpdateWithWhereUniqueWithoutUserInput = {
    where: AuthAuditLogWhereUniqueInput
    data: XOR<AuthAuditLogUpdateWithoutUserInput, AuthAuditLogUncheckedUpdateWithoutUserInput>
  }

  export type AuthAuditLogUpdateManyWithWhereWithoutUserInput = {
    where: AuthAuditLogScalarWhereInput
    data: XOR<AuthAuditLogUpdateManyMutationInput, AuthAuditLogUncheckedUpdateManyWithoutUserInput>
  }

  export type AuthAuditLogScalarWhereInput = {
    AND?: AuthAuditLogScalarWhereInput | AuthAuditLogScalarWhereInput[]
    OR?: AuthAuditLogScalarWhereInput[]
    NOT?: AuthAuditLogScalarWhereInput | AuthAuditLogScalarWhereInput[]
    id?: BigIntFilter<"AuthAuditLog"> | bigint | number
    userId?: UuidNullableFilter<"AuthAuditLog"> | string | null
    email?: StringNullableFilter<"AuthAuditLog"> | string | null
    action?: StringFilter<"AuthAuditLog"> | string
    success?: BoolFilter<"AuthAuditLog"> | boolean
    message?: StringNullableFilter<"AuthAuditLog"> | string | null
    provider?: EnumAuthProviderNullableFilter<"AuthAuditLog"> | $Enums.AuthProvider | null
    role?: EnumAuthUserRoleNullableFilter<"AuthAuditLog"> | $Enums.AuthUserRole | null
    ipAddress?: StringNullableFilter<"AuthAuditLog"> | string | null
    createdAt?: DateTimeFilter<"AuthAuditLog"> | Date | string
  }

  export type UserProfileCreateWithoutAuditLogsInput = {
    id: string
    email: string
    fullName?: string | null
    role?: $Enums.AuthUserRole
    provider?: $Enums.AuthProvider
    avatarUrl?: string | null
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserProfileUncheckedCreateWithoutAuditLogsInput = {
    id: string
    email: string
    fullName?: string | null
    role?: $Enums.AuthUserRole
    provider?: $Enums.AuthProvider
    avatarUrl?: string | null
    isEmailVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserProfileCreateOrConnectWithoutAuditLogsInput = {
    where: UserProfileWhereUniqueInput
    create: XOR<UserProfileCreateWithoutAuditLogsInput, UserProfileUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserProfileUpsertWithoutAuditLogsInput = {
    update: XOR<UserProfileUpdateWithoutAuditLogsInput, UserProfileUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserProfileCreateWithoutAuditLogsInput, UserProfileUncheckedCreateWithoutAuditLogsInput>
    where?: UserProfileWhereInput
  }

  export type UserProfileUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserProfileWhereInput
    data: XOR<UserProfileUpdateWithoutAuditLogsInput, UserProfileUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserProfileUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumAuthUserRoleFieldUpdateOperationsInput | $Enums.AuthUserRole
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileUncheckedUpdateWithoutAuditLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumAuthUserRoleFieldUpdateOperationsInput | $Enums.AuthUserRole
    provider?: EnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    isEmailVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DebtReminderConfigCreateWithoutPartnerInput = {
    id?: string
    scope?: $Enums.ReminderScope
    enabled?: boolean
    daysBeforeDue?: number
    daysAfterDue?: number
    recipientEmail?: string | null
    ccEmails?: NullableJsonNullValueInput | InputJsonValue
    lastSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DebtReminderConfigUncheckedCreateWithoutPartnerInput = {
    id?: string
    scope?: $Enums.ReminderScope
    enabled?: boolean
    daysBeforeDue?: number
    daysAfterDue?: number
    recipientEmail?: string | null
    ccEmails?: NullableJsonNullValueInput | InputJsonValue
    lastSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DebtReminderConfigCreateOrConnectWithoutPartnerInput = {
    where: DebtReminderConfigWhereUniqueInput
    create: XOR<DebtReminderConfigCreateWithoutPartnerInput, DebtReminderConfigUncheckedCreateWithoutPartnerInput>
  }

  export type DebtReminderConfigCreateManyPartnerInputEnvelope = {
    data: DebtReminderConfigCreateManyPartnerInput | DebtReminderConfigCreateManyPartnerInput[]
    skipDuplicates?: boolean
  }

  export type DebtReminderLogCreateWithoutPartnerInput = {
    id?: bigint | number
    scope: $Enums.ReminderScope
    invoiceRef?: string | null
    recipientEmail: string
    subject: string
    status?: $Enums.ReminderStatus
    errorMessage?: string | null
    scheduledAt?: Date | string
    sentAt?: Date | string | null
    createdAt?: Date | string
  }

  export type DebtReminderLogUncheckedCreateWithoutPartnerInput = {
    id?: bigint | number
    scope: $Enums.ReminderScope
    invoiceRef?: string | null
    recipientEmail: string
    subject: string
    status?: $Enums.ReminderStatus
    errorMessage?: string | null
    scheduledAt?: Date | string
    sentAt?: Date | string | null
    createdAt?: Date | string
  }

  export type DebtReminderLogCreateOrConnectWithoutPartnerInput = {
    where: DebtReminderLogWhereUniqueInput
    create: XOR<DebtReminderLogCreateWithoutPartnerInput, DebtReminderLogUncheckedCreateWithoutPartnerInput>
  }

  export type DebtReminderLogCreateManyPartnerInputEnvelope = {
    data: DebtReminderLogCreateManyPartnerInput | DebtReminderLogCreateManyPartnerInput[]
    skipDuplicates?: boolean
  }

  export type DebtReminderConfigUpsertWithWhereUniqueWithoutPartnerInput = {
    where: DebtReminderConfigWhereUniqueInput
    update: XOR<DebtReminderConfigUpdateWithoutPartnerInput, DebtReminderConfigUncheckedUpdateWithoutPartnerInput>
    create: XOR<DebtReminderConfigCreateWithoutPartnerInput, DebtReminderConfigUncheckedCreateWithoutPartnerInput>
  }

  export type DebtReminderConfigUpdateWithWhereUniqueWithoutPartnerInput = {
    where: DebtReminderConfigWhereUniqueInput
    data: XOR<DebtReminderConfigUpdateWithoutPartnerInput, DebtReminderConfigUncheckedUpdateWithoutPartnerInput>
  }

  export type DebtReminderConfigUpdateManyWithWhereWithoutPartnerInput = {
    where: DebtReminderConfigScalarWhereInput
    data: XOR<DebtReminderConfigUpdateManyMutationInput, DebtReminderConfigUncheckedUpdateManyWithoutPartnerInput>
  }

  export type DebtReminderConfigScalarWhereInput = {
    AND?: DebtReminderConfigScalarWhereInput | DebtReminderConfigScalarWhereInput[]
    OR?: DebtReminderConfigScalarWhereInput[]
    NOT?: DebtReminderConfigScalarWhereInput | DebtReminderConfigScalarWhereInput[]
    id?: UuidFilter<"DebtReminderConfig"> | string
    partnerId?: UuidFilter<"DebtReminderConfig"> | string
    scope?: EnumReminderScopeFilter<"DebtReminderConfig"> | $Enums.ReminderScope
    enabled?: BoolFilter<"DebtReminderConfig"> | boolean
    daysBeforeDue?: IntFilter<"DebtReminderConfig"> | number
    daysAfterDue?: IntFilter<"DebtReminderConfig"> | number
    recipientEmail?: StringNullableFilter<"DebtReminderConfig"> | string | null
    ccEmails?: JsonNullableFilter<"DebtReminderConfig">
    lastSentAt?: DateTimeNullableFilter<"DebtReminderConfig"> | Date | string | null
    createdAt?: DateTimeFilter<"DebtReminderConfig"> | Date | string
    updatedAt?: DateTimeFilter<"DebtReminderConfig"> | Date | string
  }

  export type DebtReminderLogUpsertWithWhereUniqueWithoutPartnerInput = {
    where: DebtReminderLogWhereUniqueInput
    update: XOR<DebtReminderLogUpdateWithoutPartnerInput, DebtReminderLogUncheckedUpdateWithoutPartnerInput>
    create: XOR<DebtReminderLogCreateWithoutPartnerInput, DebtReminderLogUncheckedCreateWithoutPartnerInput>
  }

  export type DebtReminderLogUpdateWithWhereUniqueWithoutPartnerInput = {
    where: DebtReminderLogWhereUniqueInput
    data: XOR<DebtReminderLogUpdateWithoutPartnerInput, DebtReminderLogUncheckedUpdateWithoutPartnerInput>
  }

  export type DebtReminderLogUpdateManyWithWhereWithoutPartnerInput = {
    where: DebtReminderLogScalarWhereInput
    data: XOR<DebtReminderLogUpdateManyMutationInput, DebtReminderLogUncheckedUpdateManyWithoutPartnerInput>
  }

  export type DebtReminderLogScalarWhereInput = {
    AND?: DebtReminderLogScalarWhereInput | DebtReminderLogScalarWhereInput[]
    OR?: DebtReminderLogScalarWhereInput[]
    NOT?: DebtReminderLogScalarWhereInput | DebtReminderLogScalarWhereInput[]
    id?: BigIntFilter<"DebtReminderLog"> | bigint | number
    partnerId?: UuidFilter<"DebtReminderLog"> | string
    scope?: EnumReminderScopeFilter<"DebtReminderLog"> | $Enums.ReminderScope
    invoiceRef?: StringNullableFilter<"DebtReminderLog"> | string | null
    recipientEmail?: StringFilter<"DebtReminderLog"> | string
    subject?: StringFilter<"DebtReminderLog"> | string
    status?: EnumReminderStatusFilter<"DebtReminderLog"> | $Enums.ReminderStatus
    errorMessage?: StringNullableFilter<"DebtReminderLog"> | string | null
    scheduledAt?: DateTimeFilter<"DebtReminderLog"> | Date | string
    sentAt?: DateTimeNullableFilter<"DebtReminderLog"> | Date | string | null
    createdAt?: DateTimeFilter<"DebtReminderLog"> | Date | string
  }

  export type AccountCreateWithoutChildrenInput = {
    id?: string
    code: string
    name: string
    accountType: $Enums.AccountType
    normalBalance: $Enums.NormalBalance
    level?: number
    isPosting?: boolean
    allowManualEntry?: boolean
    isActive?: boolean
    sortOrder?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: AccountCreateNestedOneWithoutChildrenInput
    revenueItems?: ItemCreateNestedManyWithoutRevenueAccountInput
    cogsItems?: ItemCreateNestedManyWithoutCogsAccountInput
    inventoryItems?: ItemCreateNestedManyWithoutInventoryAccountInput
  }

  export type AccountUncheckedCreateWithoutChildrenInput = {
    id?: string
    code: string
    name: string
    accountType: $Enums.AccountType
    normalBalance: $Enums.NormalBalance
    parentId?: string | null
    level?: number
    isPosting?: boolean
    allowManualEntry?: boolean
    isActive?: boolean
    sortOrder?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    revenueItems?: ItemUncheckedCreateNestedManyWithoutRevenueAccountInput
    cogsItems?: ItemUncheckedCreateNestedManyWithoutCogsAccountInput
    inventoryItems?: ItemUncheckedCreateNestedManyWithoutInventoryAccountInput
  }

  export type AccountCreateOrConnectWithoutChildrenInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutChildrenInput, AccountUncheckedCreateWithoutChildrenInput>
  }

  export type AccountCreateWithoutParentInput = {
    id?: string
    code: string
    name: string
    accountType: $Enums.AccountType
    normalBalance: $Enums.NormalBalance
    level?: number
    isPosting?: boolean
    allowManualEntry?: boolean
    isActive?: boolean
    sortOrder?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: AccountCreateNestedManyWithoutParentInput
    revenueItems?: ItemCreateNestedManyWithoutRevenueAccountInput
    cogsItems?: ItemCreateNestedManyWithoutCogsAccountInput
    inventoryItems?: ItemCreateNestedManyWithoutInventoryAccountInput
  }

  export type AccountUncheckedCreateWithoutParentInput = {
    id?: string
    code: string
    name: string
    accountType: $Enums.AccountType
    normalBalance: $Enums.NormalBalance
    level?: number
    isPosting?: boolean
    allowManualEntry?: boolean
    isActive?: boolean
    sortOrder?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: AccountUncheckedCreateNestedManyWithoutParentInput
    revenueItems?: ItemUncheckedCreateNestedManyWithoutRevenueAccountInput
    cogsItems?: ItemUncheckedCreateNestedManyWithoutCogsAccountInput
    inventoryItems?: ItemUncheckedCreateNestedManyWithoutInventoryAccountInput
  }

  export type AccountCreateOrConnectWithoutParentInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutParentInput, AccountUncheckedCreateWithoutParentInput>
  }

  export type AccountCreateManyParentInputEnvelope = {
    data: AccountCreateManyParentInput | AccountCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type ItemCreateWithoutRevenueAccountInput = {
    id?: string
    sku: string
    name: string
    itemType?: $Enums.ItemType
    unit: string
    salePrice?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    vatRate?: Decimal | DecimalJsLike | number | string | null
    isTrackedInventory?: boolean
    isActive?: boolean
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    cogsAccount?: AccountCreateNestedOneWithoutCogsItemsInput
    inventoryAccount?: AccountCreateNestedOneWithoutInventoryItemsInput
  }

  export type ItemUncheckedCreateWithoutRevenueAccountInput = {
    id?: string
    sku: string
    name: string
    itemType?: $Enums.ItemType
    unit: string
    salePrice?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    vatRate?: Decimal | DecimalJsLike | number | string | null
    cogsAccountId?: string | null
    inventoryAccountId?: string | null
    isTrackedInventory?: boolean
    isActive?: boolean
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemCreateOrConnectWithoutRevenueAccountInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutRevenueAccountInput, ItemUncheckedCreateWithoutRevenueAccountInput>
  }

  export type ItemCreateManyRevenueAccountInputEnvelope = {
    data: ItemCreateManyRevenueAccountInput | ItemCreateManyRevenueAccountInput[]
    skipDuplicates?: boolean
  }

  export type ItemCreateWithoutCogsAccountInput = {
    id?: string
    sku: string
    name: string
    itemType?: $Enums.ItemType
    unit: string
    salePrice?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    vatRate?: Decimal | DecimalJsLike | number | string | null
    isTrackedInventory?: boolean
    isActive?: boolean
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    revenueAccount?: AccountCreateNestedOneWithoutRevenueItemsInput
    inventoryAccount?: AccountCreateNestedOneWithoutInventoryItemsInput
  }

  export type ItemUncheckedCreateWithoutCogsAccountInput = {
    id?: string
    sku: string
    name: string
    itemType?: $Enums.ItemType
    unit: string
    salePrice?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    vatRate?: Decimal | DecimalJsLike | number | string | null
    revenueAccountId?: string | null
    inventoryAccountId?: string | null
    isTrackedInventory?: boolean
    isActive?: boolean
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemCreateOrConnectWithoutCogsAccountInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutCogsAccountInput, ItemUncheckedCreateWithoutCogsAccountInput>
  }

  export type ItemCreateManyCogsAccountInputEnvelope = {
    data: ItemCreateManyCogsAccountInput | ItemCreateManyCogsAccountInput[]
    skipDuplicates?: boolean
  }

  export type ItemCreateWithoutInventoryAccountInput = {
    id?: string
    sku: string
    name: string
    itemType?: $Enums.ItemType
    unit: string
    salePrice?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    vatRate?: Decimal | DecimalJsLike | number | string | null
    isTrackedInventory?: boolean
    isActive?: boolean
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    revenueAccount?: AccountCreateNestedOneWithoutRevenueItemsInput
    cogsAccount?: AccountCreateNestedOneWithoutCogsItemsInput
  }

  export type ItemUncheckedCreateWithoutInventoryAccountInput = {
    id?: string
    sku: string
    name: string
    itemType?: $Enums.ItemType
    unit: string
    salePrice?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    vatRate?: Decimal | DecimalJsLike | number | string | null
    revenueAccountId?: string | null
    cogsAccountId?: string | null
    isTrackedInventory?: boolean
    isActive?: boolean
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemCreateOrConnectWithoutInventoryAccountInput = {
    where: ItemWhereUniqueInput
    create: XOR<ItemCreateWithoutInventoryAccountInput, ItemUncheckedCreateWithoutInventoryAccountInput>
  }

  export type ItemCreateManyInventoryAccountInputEnvelope = {
    data: ItemCreateManyInventoryAccountInput | ItemCreateManyInventoryAccountInput[]
    skipDuplicates?: boolean
  }

  export type AccountUpsertWithoutChildrenInput = {
    update: XOR<AccountUpdateWithoutChildrenInput, AccountUncheckedUpdateWithoutChildrenInput>
    create: XOR<AccountCreateWithoutChildrenInput, AccountUncheckedCreateWithoutChildrenInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutChildrenInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutChildrenInput, AccountUncheckedUpdateWithoutChildrenInput>
  }

  export type AccountUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    normalBalance?: EnumNormalBalanceFieldUpdateOperationsInput | $Enums.NormalBalance
    level?: IntFieldUpdateOperationsInput | number
    isPosting?: BoolFieldUpdateOperationsInput | boolean
    allowManualEntry?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: AccountUpdateOneWithoutChildrenNestedInput
    revenueItems?: ItemUpdateManyWithoutRevenueAccountNestedInput
    cogsItems?: ItemUpdateManyWithoutCogsAccountNestedInput
    inventoryItems?: ItemUpdateManyWithoutInventoryAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    normalBalance?: EnumNormalBalanceFieldUpdateOperationsInput | $Enums.NormalBalance
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    level?: IntFieldUpdateOperationsInput | number
    isPosting?: BoolFieldUpdateOperationsInput | boolean
    allowManualEntry?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revenueItems?: ItemUncheckedUpdateManyWithoutRevenueAccountNestedInput
    cogsItems?: ItemUncheckedUpdateManyWithoutCogsAccountNestedInput
    inventoryItems?: ItemUncheckedUpdateManyWithoutInventoryAccountNestedInput
  }

  export type AccountUpsertWithWhereUniqueWithoutParentInput = {
    where: AccountWhereUniqueInput
    update: XOR<AccountUpdateWithoutParentInput, AccountUncheckedUpdateWithoutParentInput>
    create: XOR<AccountCreateWithoutParentInput, AccountUncheckedCreateWithoutParentInput>
  }

  export type AccountUpdateWithWhereUniqueWithoutParentInput = {
    where: AccountWhereUniqueInput
    data: XOR<AccountUpdateWithoutParentInput, AccountUncheckedUpdateWithoutParentInput>
  }

  export type AccountUpdateManyWithWhereWithoutParentInput = {
    where: AccountScalarWhereInput
    data: XOR<AccountUpdateManyMutationInput, AccountUncheckedUpdateManyWithoutParentInput>
  }

  export type AccountScalarWhereInput = {
    AND?: AccountScalarWhereInput | AccountScalarWhereInput[]
    OR?: AccountScalarWhereInput[]
    NOT?: AccountScalarWhereInput | AccountScalarWhereInput[]
    id?: UuidFilter<"Account"> | string
    code?: StringFilter<"Account"> | string
    name?: StringFilter<"Account"> | string
    accountType?: EnumAccountTypeFilter<"Account"> | $Enums.AccountType
    normalBalance?: EnumNormalBalanceFilter<"Account"> | $Enums.NormalBalance
    parentId?: UuidNullableFilter<"Account"> | string | null
    level?: IntFilter<"Account"> | number
    isPosting?: BoolFilter<"Account"> | boolean
    allowManualEntry?: BoolFilter<"Account"> | boolean
    isActive?: BoolFilter<"Account"> | boolean
    sortOrder?: IntFilter<"Account"> | number
    description?: StringNullableFilter<"Account"> | string | null
    createdAt?: DateTimeFilter<"Account"> | Date | string
    updatedAt?: DateTimeFilter<"Account"> | Date | string
  }

  export type ItemUpsertWithWhereUniqueWithoutRevenueAccountInput = {
    where: ItemWhereUniqueInput
    update: XOR<ItemUpdateWithoutRevenueAccountInput, ItemUncheckedUpdateWithoutRevenueAccountInput>
    create: XOR<ItemCreateWithoutRevenueAccountInput, ItemUncheckedCreateWithoutRevenueAccountInput>
  }

  export type ItemUpdateWithWhereUniqueWithoutRevenueAccountInput = {
    where: ItemWhereUniqueInput
    data: XOR<ItemUpdateWithoutRevenueAccountInput, ItemUncheckedUpdateWithoutRevenueAccountInput>
  }

  export type ItemUpdateManyWithWhereWithoutRevenueAccountInput = {
    where: ItemScalarWhereInput
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyWithoutRevenueAccountInput>
  }

  export type ItemScalarWhereInput = {
    AND?: ItemScalarWhereInput | ItemScalarWhereInput[]
    OR?: ItemScalarWhereInput[]
    NOT?: ItemScalarWhereInput | ItemScalarWhereInput[]
    id?: UuidFilter<"Item"> | string
    sku?: StringFilter<"Item"> | string
    name?: StringFilter<"Item"> | string
    itemType?: EnumItemTypeFilter<"Item"> | $Enums.ItemType
    unit?: StringFilter<"Item"> | string
    salePrice?: DecimalNullableFilter<"Item"> | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: DecimalNullableFilter<"Item"> | Decimal | DecimalJsLike | number | string | null
    vatRate?: DecimalNullableFilter<"Item"> | Decimal | DecimalJsLike | number | string | null
    revenueAccountId?: UuidNullableFilter<"Item"> | string | null
    cogsAccountId?: UuidNullableFilter<"Item"> | string | null
    inventoryAccountId?: UuidNullableFilter<"Item"> | string | null
    isTrackedInventory?: BoolFilter<"Item"> | boolean
    isActive?: BoolFilter<"Item"> | boolean
    description?: StringNullableFilter<"Item"> | string | null
    createdAt?: DateTimeFilter<"Item"> | Date | string
    updatedAt?: DateTimeFilter<"Item"> | Date | string
  }

  export type ItemUpsertWithWhereUniqueWithoutCogsAccountInput = {
    where: ItemWhereUniqueInput
    update: XOR<ItemUpdateWithoutCogsAccountInput, ItemUncheckedUpdateWithoutCogsAccountInput>
    create: XOR<ItemCreateWithoutCogsAccountInput, ItemUncheckedCreateWithoutCogsAccountInput>
  }

  export type ItemUpdateWithWhereUniqueWithoutCogsAccountInput = {
    where: ItemWhereUniqueInput
    data: XOR<ItemUpdateWithoutCogsAccountInput, ItemUncheckedUpdateWithoutCogsAccountInput>
  }

  export type ItemUpdateManyWithWhereWithoutCogsAccountInput = {
    where: ItemScalarWhereInput
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyWithoutCogsAccountInput>
  }

  export type ItemUpsertWithWhereUniqueWithoutInventoryAccountInput = {
    where: ItemWhereUniqueInput
    update: XOR<ItemUpdateWithoutInventoryAccountInput, ItemUncheckedUpdateWithoutInventoryAccountInput>
    create: XOR<ItemCreateWithoutInventoryAccountInput, ItemUncheckedCreateWithoutInventoryAccountInput>
  }

  export type ItemUpdateWithWhereUniqueWithoutInventoryAccountInput = {
    where: ItemWhereUniqueInput
    data: XOR<ItemUpdateWithoutInventoryAccountInput, ItemUncheckedUpdateWithoutInventoryAccountInput>
  }

  export type ItemUpdateManyWithWhereWithoutInventoryAccountInput = {
    where: ItemScalarWhereInput
    data: XOR<ItemUpdateManyMutationInput, ItemUncheckedUpdateManyWithoutInventoryAccountInput>
  }

  export type AccountCreateWithoutRevenueItemsInput = {
    id?: string
    code: string
    name: string
    accountType: $Enums.AccountType
    normalBalance: $Enums.NormalBalance
    level?: number
    isPosting?: boolean
    allowManualEntry?: boolean
    isActive?: boolean
    sortOrder?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: AccountCreateNestedOneWithoutChildrenInput
    children?: AccountCreateNestedManyWithoutParentInput
    cogsItems?: ItemCreateNestedManyWithoutCogsAccountInput
    inventoryItems?: ItemCreateNestedManyWithoutInventoryAccountInput
  }

  export type AccountUncheckedCreateWithoutRevenueItemsInput = {
    id?: string
    code: string
    name: string
    accountType: $Enums.AccountType
    normalBalance: $Enums.NormalBalance
    parentId?: string | null
    level?: number
    isPosting?: boolean
    allowManualEntry?: boolean
    isActive?: boolean
    sortOrder?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: AccountUncheckedCreateNestedManyWithoutParentInput
    cogsItems?: ItemUncheckedCreateNestedManyWithoutCogsAccountInput
    inventoryItems?: ItemUncheckedCreateNestedManyWithoutInventoryAccountInput
  }

  export type AccountCreateOrConnectWithoutRevenueItemsInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutRevenueItemsInput, AccountUncheckedCreateWithoutRevenueItemsInput>
  }

  export type AccountCreateWithoutCogsItemsInput = {
    id?: string
    code: string
    name: string
    accountType: $Enums.AccountType
    normalBalance: $Enums.NormalBalance
    level?: number
    isPosting?: boolean
    allowManualEntry?: boolean
    isActive?: boolean
    sortOrder?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: AccountCreateNestedOneWithoutChildrenInput
    children?: AccountCreateNestedManyWithoutParentInput
    revenueItems?: ItemCreateNestedManyWithoutRevenueAccountInput
    inventoryItems?: ItemCreateNestedManyWithoutInventoryAccountInput
  }

  export type AccountUncheckedCreateWithoutCogsItemsInput = {
    id?: string
    code: string
    name: string
    accountType: $Enums.AccountType
    normalBalance: $Enums.NormalBalance
    parentId?: string | null
    level?: number
    isPosting?: boolean
    allowManualEntry?: boolean
    isActive?: boolean
    sortOrder?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: AccountUncheckedCreateNestedManyWithoutParentInput
    revenueItems?: ItemUncheckedCreateNestedManyWithoutRevenueAccountInput
    inventoryItems?: ItemUncheckedCreateNestedManyWithoutInventoryAccountInput
  }

  export type AccountCreateOrConnectWithoutCogsItemsInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutCogsItemsInput, AccountUncheckedCreateWithoutCogsItemsInput>
  }

  export type AccountCreateWithoutInventoryItemsInput = {
    id?: string
    code: string
    name: string
    accountType: $Enums.AccountType
    normalBalance: $Enums.NormalBalance
    level?: number
    isPosting?: boolean
    allowManualEntry?: boolean
    isActive?: boolean
    sortOrder?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: AccountCreateNestedOneWithoutChildrenInput
    children?: AccountCreateNestedManyWithoutParentInput
    revenueItems?: ItemCreateNestedManyWithoutRevenueAccountInput
    cogsItems?: ItemCreateNestedManyWithoutCogsAccountInput
  }

  export type AccountUncheckedCreateWithoutInventoryItemsInput = {
    id?: string
    code: string
    name: string
    accountType: $Enums.AccountType
    normalBalance: $Enums.NormalBalance
    parentId?: string | null
    level?: number
    isPosting?: boolean
    allowManualEntry?: boolean
    isActive?: boolean
    sortOrder?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: AccountUncheckedCreateNestedManyWithoutParentInput
    revenueItems?: ItemUncheckedCreateNestedManyWithoutRevenueAccountInput
    cogsItems?: ItemUncheckedCreateNestedManyWithoutCogsAccountInput
  }

  export type AccountCreateOrConnectWithoutInventoryItemsInput = {
    where: AccountWhereUniqueInput
    create: XOR<AccountCreateWithoutInventoryItemsInput, AccountUncheckedCreateWithoutInventoryItemsInput>
  }

  export type AccountUpsertWithoutRevenueItemsInput = {
    update: XOR<AccountUpdateWithoutRevenueItemsInput, AccountUncheckedUpdateWithoutRevenueItemsInput>
    create: XOR<AccountCreateWithoutRevenueItemsInput, AccountUncheckedCreateWithoutRevenueItemsInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutRevenueItemsInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutRevenueItemsInput, AccountUncheckedUpdateWithoutRevenueItemsInput>
  }

  export type AccountUpdateWithoutRevenueItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    normalBalance?: EnumNormalBalanceFieldUpdateOperationsInput | $Enums.NormalBalance
    level?: IntFieldUpdateOperationsInput | number
    isPosting?: BoolFieldUpdateOperationsInput | boolean
    allowManualEntry?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: AccountUpdateOneWithoutChildrenNestedInput
    children?: AccountUpdateManyWithoutParentNestedInput
    cogsItems?: ItemUpdateManyWithoutCogsAccountNestedInput
    inventoryItems?: ItemUpdateManyWithoutInventoryAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutRevenueItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    normalBalance?: EnumNormalBalanceFieldUpdateOperationsInput | $Enums.NormalBalance
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    level?: IntFieldUpdateOperationsInput | number
    isPosting?: BoolFieldUpdateOperationsInput | boolean
    allowManualEntry?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: AccountUncheckedUpdateManyWithoutParentNestedInput
    cogsItems?: ItemUncheckedUpdateManyWithoutCogsAccountNestedInput
    inventoryItems?: ItemUncheckedUpdateManyWithoutInventoryAccountNestedInput
  }

  export type AccountUpsertWithoutCogsItemsInput = {
    update: XOR<AccountUpdateWithoutCogsItemsInput, AccountUncheckedUpdateWithoutCogsItemsInput>
    create: XOR<AccountCreateWithoutCogsItemsInput, AccountUncheckedCreateWithoutCogsItemsInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutCogsItemsInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutCogsItemsInput, AccountUncheckedUpdateWithoutCogsItemsInput>
  }

  export type AccountUpdateWithoutCogsItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    normalBalance?: EnumNormalBalanceFieldUpdateOperationsInput | $Enums.NormalBalance
    level?: IntFieldUpdateOperationsInput | number
    isPosting?: BoolFieldUpdateOperationsInput | boolean
    allowManualEntry?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: AccountUpdateOneWithoutChildrenNestedInput
    children?: AccountUpdateManyWithoutParentNestedInput
    revenueItems?: ItemUpdateManyWithoutRevenueAccountNestedInput
    inventoryItems?: ItemUpdateManyWithoutInventoryAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutCogsItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    normalBalance?: EnumNormalBalanceFieldUpdateOperationsInput | $Enums.NormalBalance
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    level?: IntFieldUpdateOperationsInput | number
    isPosting?: BoolFieldUpdateOperationsInput | boolean
    allowManualEntry?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: AccountUncheckedUpdateManyWithoutParentNestedInput
    revenueItems?: ItemUncheckedUpdateManyWithoutRevenueAccountNestedInput
    inventoryItems?: ItemUncheckedUpdateManyWithoutInventoryAccountNestedInput
  }

  export type AccountUpsertWithoutInventoryItemsInput = {
    update: XOR<AccountUpdateWithoutInventoryItemsInput, AccountUncheckedUpdateWithoutInventoryItemsInput>
    create: XOR<AccountCreateWithoutInventoryItemsInput, AccountUncheckedCreateWithoutInventoryItemsInput>
    where?: AccountWhereInput
  }

  export type AccountUpdateToOneWithWhereWithoutInventoryItemsInput = {
    where?: AccountWhereInput
    data: XOR<AccountUpdateWithoutInventoryItemsInput, AccountUncheckedUpdateWithoutInventoryItemsInput>
  }

  export type AccountUpdateWithoutInventoryItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    normalBalance?: EnumNormalBalanceFieldUpdateOperationsInput | $Enums.NormalBalance
    level?: IntFieldUpdateOperationsInput | number
    isPosting?: BoolFieldUpdateOperationsInput | boolean
    allowManualEntry?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: AccountUpdateOneWithoutChildrenNestedInput
    children?: AccountUpdateManyWithoutParentNestedInput
    revenueItems?: ItemUpdateManyWithoutRevenueAccountNestedInput
    cogsItems?: ItemUpdateManyWithoutCogsAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutInventoryItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    normalBalance?: EnumNormalBalanceFieldUpdateOperationsInput | $Enums.NormalBalance
    parentId?: NullableStringFieldUpdateOperationsInput | string | null
    level?: IntFieldUpdateOperationsInput | number
    isPosting?: BoolFieldUpdateOperationsInput | boolean
    allowManualEntry?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: AccountUncheckedUpdateManyWithoutParentNestedInput
    revenueItems?: ItemUncheckedUpdateManyWithoutRevenueAccountNestedInput
    cogsItems?: ItemUncheckedUpdateManyWithoutCogsAccountNestedInput
  }

  export type PartnerCreateWithoutDebtRemindersInput = {
    id?: string
    code: string
    name: string
    partnerType?: $Enums.PartnerType
    taxCode?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    paymentTermDays?: number | null
    creditLimit?: Decimal | DecimalJsLike | number | string | null
    isActive?: boolean
    debtReminderOn?: boolean
    reminderEmail?: string | null
    reminderCcEmails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    debtReminderLogs?: DebtReminderLogCreateNestedManyWithoutPartnerInput
  }

  export type PartnerUncheckedCreateWithoutDebtRemindersInput = {
    id?: string
    code: string
    name: string
    partnerType?: $Enums.PartnerType
    taxCode?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    paymentTermDays?: number | null
    creditLimit?: Decimal | DecimalJsLike | number | string | null
    isActive?: boolean
    debtReminderOn?: boolean
    reminderEmail?: string | null
    reminderCcEmails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    debtReminderLogs?: DebtReminderLogUncheckedCreateNestedManyWithoutPartnerInput
  }

  export type PartnerCreateOrConnectWithoutDebtRemindersInput = {
    where: PartnerWhereUniqueInput
    create: XOR<PartnerCreateWithoutDebtRemindersInput, PartnerUncheckedCreateWithoutDebtRemindersInput>
  }

  export type PartnerUpsertWithoutDebtRemindersInput = {
    update: XOR<PartnerUpdateWithoutDebtRemindersInput, PartnerUncheckedUpdateWithoutDebtRemindersInput>
    create: XOR<PartnerCreateWithoutDebtRemindersInput, PartnerUncheckedCreateWithoutDebtRemindersInput>
    where?: PartnerWhereInput
  }

  export type PartnerUpdateToOneWithWhereWithoutDebtRemindersInput = {
    where?: PartnerWhereInput
    data: XOR<PartnerUpdateWithoutDebtRemindersInput, PartnerUncheckedUpdateWithoutDebtRemindersInput>
  }

  export type PartnerUpdateWithoutDebtRemindersInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    partnerType?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    taxCode?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTermDays?: NullableIntFieldUpdateOperationsInput | number | null
    creditLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    debtReminderOn?: BoolFieldUpdateOperationsInput | boolean
    reminderEmail?: NullableStringFieldUpdateOperationsInput | string | null
    reminderCcEmails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    debtReminderLogs?: DebtReminderLogUpdateManyWithoutPartnerNestedInput
  }

  export type PartnerUncheckedUpdateWithoutDebtRemindersInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    partnerType?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    taxCode?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTermDays?: NullableIntFieldUpdateOperationsInput | number | null
    creditLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    debtReminderOn?: BoolFieldUpdateOperationsInput | boolean
    reminderEmail?: NullableStringFieldUpdateOperationsInput | string | null
    reminderCcEmails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    debtReminderLogs?: DebtReminderLogUncheckedUpdateManyWithoutPartnerNestedInput
  }

  export type PartnerCreateWithoutDebtReminderLogsInput = {
    id?: string
    code: string
    name: string
    partnerType?: $Enums.PartnerType
    taxCode?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    paymentTermDays?: number | null
    creditLimit?: Decimal | DecimalJsLike | number | string | null
    isActive?: boolean
    debtReminderOn?: boolean
    reminderEmail?: string | null
    reminderCcEmails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    debtReminders?: DebtReminderConfigCreateNestedManyWithoutPartnerInput
  }

  export type PartnerUncheckedCreateWithoutDebtReminderLogsInput = {
    id?: string
    code: string
    name: string
    partnerType?: $Enums.PartnerType
    taxCode?: string | null
    phone?: string | null
    email?: string | null
    address?: string | null
    paymentTermDays?: number | null
    creditLimit?: Decimal | DecimalJsLike | number | string | null
    isActive?: boolean
    debtReminderOn?: boolean
    reminderEmail?: string | null
    reminderCcEmails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    debtReminders?: DebtReminderConfigUncheckedCreateNestedManyWithoutPartnerInput
  }

  export type PartnerCreateOrConnectWithoutDebtReminderLogsInput = {
    where: PartnerWhereUniqueInput
    create: XOR<PartnerCreateWithoutDebtReminderLogsInput, PartnerUncheckedCreateWithoutDebtReminderLogsInput>
  }

  export type PartnerUpsertWithoutDebtReminderLogsInput = {
    update: XOR<PartnerUpdateWithoutDebtReminderLogsInput, PartnerUncheckedUpdateWithoutDebtReminderLogsInput>
    create: XOR<PartnerCreateWithoutDebtReminderLogsInput, PartnerUncheckedCreateWithoutDebtReminderLogsInput>
    where?: PartnerWhereInput
  }

  export type PartnerUpdateToOneWithWhereWithoutDebtReminderLogsInput = {
    where?: PartnerWhereInput
    data: XOR<PartnerUpdateWithoutDebtReminderLogsInput, PartnerUncheckedUpdateWithoutDebtReminderLogsInput>
  }

  export type PartnerUpdateWithoutDebtReminderLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    partnerType?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    taxCode?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTermDays?: NullableIntFieldUpdateOperationsInput | number | null
    creditLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    debtReminderOn?: BoolFieldUpdateOperationsInput | boolean
    reminderEmail?: NullableStringFieldUpdateOperationsInput | string | null
    reminderCcEmails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    debtReminders?: DebtReminderConfigUpdateManyWithoutPartnerNestedInput
  }

  export type PartnerUncheckedUpdateWithoutDebtReminderLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    partnerType?: EnumPartnerTypeFieldUpdateOperationsInput | $Enums.PartnerType
    taxCode?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    paymentTermDays?: NullableIntFieldUpdateOperationsInput | number | null
    creditLimit?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    debtReminderOn?: BoolFieldUpdateOperationsInput | boolean
    reminderEmail?: NullableStringFieldUpdateOperationsInput | string | null
    reminderCcEmails?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    debtReminders?: DebtReminderConfigUncheckedUpdateManyWithoutPartnerNestedInput
  }

  export type AuthAuditLogCreateManyUserInput = {
    id?: bigint | number
    email?: string | null
    action: string
    success: boolean
    message?: string | null
    provider?: $Enums.AuthProvider | null
    role?: $Enums.AuthUserRole | null
    ipAddress?: string | null
    createdAt?: Date | string
  }

  export type AuthAuditLogUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    message?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableEnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider | null
    role?: NullableEnumAuthUserRoleFieldUpdateOperationsInput | $Enums.AuthUserRole | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthAuditLogUncheckedUpdateWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    message?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableEnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider | null
    role?: NullableEnumAuthUserRoleFieldUpdateOperationsInput | $Enums.AuthUserRole | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuthAuditLogUncheckedUpdateManyWithoutUserInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    email?: NullableStringFieldUpdateOperationsInput | string | null
    action?: StringFieldUpdateOperationsInput | string
    success?: BoolFieldUpdateOperationsInput | boolean
    message?: NullableStringFieldUpdateOperationsInput | string | null
    provider?: NullableEnumAuthProviderFieldUpdateOperationsInput | $Enums.AuthProvider | null
    role?: NullableEnumAuthUserRoleFieldUpdateOperationsInput | $Enums.AuthUserRole | null
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DebtReminderConfigCreateManyPartnerInput = {
    id?: string
    scope?: $Enums.ReminderScope
    enabled?: boolean
    daysBeforeDue?: number
    daysAfterDue?: number
    recipientEmail?: string | null
    ccEmails?: NullableJsonNullValueInput | InputJsonValue
    lastSentAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DebtReminderLogCreateManyPartnerInput = {
    id?: bigint | number
    scope: $Enums.ReminderScope
    invoiceRef?: string | null
    recipientEmail: string
    subject: string
    status?: $Enums.ReminderStatus
    errorMessage?: string | null
    scheduledAt?: Date | string
    sentAt?: Date | string | null
    createdAt?: Date | string
  }

  export type DebtReminderConfigUpdateWithoutPartnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    scope?: EnumReminderScopeFieldUpdateOperationsInput | $Enums.ReminderScope
    enabled?: BoolFieldUpdateOperationsInput | boolean
    daysBeforeDue?: IntFieldUpdateOperationsInput | number
    daysAfterDue?: IntFieldUpdateOperationsInput | number
    recipientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    ccEmails?: NullableJsonNullValueInput | InputJsonValue
    lastSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DebtReminderConfigUncheckedUpdateWithoutPartnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    scope?: EnumReminderScopeFieldUpdateOperationsInput | $Enums.ReminderScope
    enabled?: BoolFieldUpdateOperationsInput | boolean
    daysBeforeDue?: IntFieldUpdateOperationsInput | number
    daysAfterDue?: IntFieldUpdateOperationsInput | number
    recipientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    ccEmails?: NullableJsonNullValueInput | InputJsonValue
    lastSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DebtReminderConfigUncheckedUpdateManyWithoutPartnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    scope?: EnumReminderScopeFieldUpdateOperationsInput | $Enums.ReminderScope
    enabled?: BoolFieldUpdateOperationsInput | boolean
    daysBeforeDue?: IntFieldUpdateOperationsInput | number
    daysAfterDue?: IntFieldUpdateOperationsInput | number
    recipientEmail?: NullableStringFieldUpdateOperationsInput | string | null
    ccEmails?: NullableJsonNullValueInput | InputJsonValue
    lastSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DebtReminderLogUpdateWithoutPartnerInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    scope?: EnumReminderScopeFieldUpdateOperationsInput | $Enums.ReminderScope
    invoiceRef?: NullableStringFieldUpdateOperationsInput | string | null
    recipientEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DebtReminderLogUncheckedUpdateWithoutPartnerInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    scope?: EnumReminderScopeFieldUpdateOperationsInput | $Enums.ReminderScope
    invoiceRef?: NullableStringFieldUpdateOperationsInput | string | null
    recipientEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DebtReminderLogUncheckedUpdateManyWithoutPartnerInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    scope?: EnumReminderScopeFieldUpdateOperationsInput | $Enums.ReminderScope
    invoiceRef?: NullableStringFieldUpdateOperationsInput | string | null
    recipientEmail?: StringFieldUpdateOperationsInput | string
    subject?: StringFieldUpdateOperationsInput | string
    status?: EnumReminderStatusFieldUpdateOperationsInput | $Enums.ReminderStatus
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AccountCreateManyParentInput = {
    id?: string
    code: string
    name: string
    accountType: $Enums.AccountType
    normalBalance: $Enums.NormalBalance
    level?: number
    isPosting?: boolean
    allowManualEntry?: boolean
    isActive?: boolean
    sortOrder?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemCreateManyRevenueAccountInput = {
    id?: string
    sku: string
    name: string
    itemType?: $Enums.ItemType
    unit: string
    salePrice?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    vatRate?: Decimal | DecimalJsLike | number | string | null
    cogsAccountId?: string | null
    inventoryAccountId?: string | null
    isTrackedInventory?: boolean
    isActive?: boolean
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemCreateManyCogsAccountInput = {
    id?: string
    sku: string
    name: string
    itemType?: $Enums.ItemType
    unit: string
    salePrice?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    vatRate?: Decimal | DecimalJsLike | number | string | null
    revenueAccountId?: string | null
    inventoryAccountId?: string | null
    isTrackedInventory?: boolean
    isActive?: boolean
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ItemCreateManyInventoryAccountInput = {
    id?: string
    sku: string
    name: string
    itemType?: $Enums.ItemType
    unit: string
    salePrice?: Decimal | DecimalJsLike | number | string | null
    purchasePrice?: Decimal | DecimalJsLike | number | string | null
    vatRate?: Decimal | DecimalJsLike | number | string | null
    revenueAccountId?: string | null
    cogsAccountId?: string | null
    isTrackedInventory?: boolean
    isActive?: boolean
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AccountUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    normalBalance?: EnumNormalBalanceFieldUpdateOperationsInput | $Enums.NormalBalance
    level?: IntFieldUpdateOperationsInput | number
    isPosting?: BoolFieldUpdateOperationsInput | boolean
    allowManualEntry?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: AccountUpdateManyWithoutParentNestedInput
    revenueItems?: ItemUpdateManyWithoutRevenueAccountNestedInput
    cogsItems?: ItemUpdateManyWithoutCogsAccountNestedInput
    inventoryItems?: ItemUpdateManyWithoutInventoryAccountNestedInput
  }

  export type AccountUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    normalBalance?: EnumNormalBalanceFieldUpdateOperationsInput | $Enums.NormalBalance
    level?: IntFieldUpdateOperationsInput | number
    isPosting?: BoolFieldUpdateOperationsInput | boolean
    allowManualEntry?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: AccountUncheckedUpdateManyWithoutParentNestedInput
    revenueItems?: ItemUncheckedUpdateManyWithoutRevenueAccountNestedInput
    cogsItems?: ItemUncheckedUpdateManyWithoutCogsAccountNestedInput
    inventoryItems?: ItemUncheckedUpdateManyWithoutInventoryAccountNestedInput
  }

  export type AccountUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    accountType?: EnumAccountTypeFieldUpdateOperationsInput | $Enums.AccountType
    normalBalance?: EnumNormalBalanceFieldUpdateOperationsInput | $Enums.NormalBalance
    level?: IntFieldUpdateOperationsInput | number
    isPosting?: BoolFieldUpdateOperationsInput | boolean
    allowManualEntry?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    sortOrder?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemUpdateWithoutRevenueAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    itemType?: EnumItemTypeFieldUpdateOperationsInput | $Enums.ItemType
    unit?: StringFieldUpdateOperationsInput | string
    salePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    vatRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isTrackedInventory?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    cogsAccount?: AccountUpdateOneWithoutCogsItemsNestedInput
    inventoryAccount?: AccountUpdateOneWithoutInventoryItemsNestedInput
  }

  export type ItemUncheckedUpdateWithoutRevenueAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    itemType?: EnumItemTypeFieldUpdateOperationsInput | $Enums.ItemType
    unit?: StringFieldUpdateOperationsInput | string
    salePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    vatRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    cogsAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    inventoryAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isTrackedInventory?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemUncheckedUpdateManyWithoutRevenueAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    itemType?: EnumItemTypeFieldUpdateOperationsInput | $Enums.ItemType
    unit?: StringFieldUpdateOperationsInput | string
    salePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    vatRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    cogsAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    inventoryAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isTrackedInventory?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemUpdateWithoutCogsAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    itemType?: EnumItemTypeFieldUpdateOperationsInput | $Enums.ItemType
    unit?: StringFieldUpdateOperationsInput | string
    salePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    vatRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isTrackedInventory?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revenueAccount?: AccountUpdateOneWithoutRevenueItemsNestedInput
    inventoryAccount?: AccountUpdateOneWithoutInventoryItemsNestedInput
  }

  export type ItemUncheckedUpdateWithoutCogsAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    itemType?: EnumItemTypeFieldUpdateOperationsInput | $Enums.ItemType
    unit?: StringFieldUpdateOperationsInput | string
    salePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    vatRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    revenueAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    inventoryAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isTrackedInventory?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemUncheckedUpdateManyWithoutCogsAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    itemType?: EnumItemTypeFieldUpdateOperationsInput | $Enums.ItemType
    unit?: StringFieldUpdateOperationsInput | string
    salePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    vatRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    revenueAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    inventoryAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isTrackedInventory?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemUpdateWithoutInventoryAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    itemType?: EnumItemTypeFieldUpdateOperationsInput | $Enums.ItemType
    unit?: StringFieldUpdateOperationsInput | string
    salePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    vatRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    isTrackedInventory?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revenueAccount?: AccountUpdateOneWithoutRevenueItemsNestedInput
    cogsAccount?: AccountUpdateOneWithoutCogsItemsNestedInput
  }

  export type ItemUncheckedUpdateWithoutInventoryAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    itemType?: EnumItemTypeFieldUpdateOperationsInput | $Enums.ItemType
    unit?: StringFieldUpdateOperationsInput | string
    salePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    vatRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    revenueAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    cogsAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isTrackedInventory?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ItemUncheckedUpdateManyWithoutInventoryAccountInput = {
    id?: StringFieldUpdateOperationsInput | string
    sku?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    itemType?: EnumItemTypeFieldUpdateOperationsInput | $Enums.ItemType
    unit?: StringFieldUpdateOperationsInput | string
    salePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    purchasePrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    vatRate?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    revenueAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    cogsAccountId?: NullableStringFieldUpdateOperationsInput | string | null
    isTrackedInventory?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}