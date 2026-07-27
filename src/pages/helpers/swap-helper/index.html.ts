// metadata
export const version = "0.14.3"
export const title = "Swap Helper"
export const description =
  "A DEX swap anonymizer contract - trade privately through any AMM using the balance-delta idiom"
export const githubLink = ""
export const githubLabel = ""

export const keywords = [
  "swap",
  "amm",
  "dex",
  "helper",
  "balance delta",
  "privacy_invoke",
]

export const codes = [
  {
    fileName: "MockAmm.cairo",
    code: "Ly8gQWRhcHRlZCBmcm9tIHN0YXJrbmV0LXByaXZhY3kgcGFja2FnZXMvcHJpdmFjeS9zcmMvdGVzdF9jb250cmFjdHMvbW9ja19hbW0uY2Fpcm8KLy8gKEFwYWNoZS0yLjAsIFN0YXJrV2FyZSkuIFRlc3Qtb25seSBlbnRyeSBwb2ludHMgcmVtb3ZlZC4KdXNlIHN0YXJrbmV0OjpDb250cmFjdEFkZHJlc3M7CgovLy8gSW50ZXJmYWNlIGZvciB0aGUgbW9jayBBTU0uCiNbc3RhcmtuZXQ6OmludGVyZmFjZV0KcHViIHRyYWl0IElNb2NrQU1NPFQ+IHsKICAgIGZuIHN3YXAocmVmIHNlbGY6IFQsIGluX3Rva2VuOiBDb250cmFjdEFkZHJlc3MsIG91dF90b2tlbjogQ29udHJhY3RBZGRyZXNzLCBhbW91bnQ6IHUyNTYpOwp9CgovLy8gTW9jayBBTU0gY29udHJhY3QgdXNlZCB0byBkZW1vIHRoZSBzd2FwIGhlbHBlci4KLy8vIEltcGxlbWVudHMgYSBzaW1wbGUgMToxIHN3YXAuCiNbc3RhcmtuZXQ6OmNvbnRyYWN0XQpwdWIgbW9kIE1vY2tBTU0gewogICAgdXNlIG9wZW56ZXBwZWxpbjo6aW50ZXJmYWNlczo6dG9rZW46OmVyYzIwOjp7SUVSQzIwRGlzcGF0Y2hlciwgSUVSQzIwRGlzcGF0Y2hlclRyYWl0fTsKICAgIHVzZSBzdGFya25ldDo6e0NvbnRyYWN0QWRkcmVzcywgZ2V0X2NhbGxlcl9hZGRyZXNzLCBnZXRfY29udHJhY3RfYWRkcmVzc307CiAgICB1c2Ugc3VwZXI6OklNb2NrQU1NOwoKICAgICNbc3RvcmFnZV0KICAgIHN0cnVjdCBTdG9yYWdlIHt9CgogICAgI1tjb25zdHJ1Y3Rvcl0KICAgIGZuIGNvbnN0cnVjdG9yKHJlZiBzZWxmOiBDb250cmFjdFN0YXRlKSB7fQoKICAgICNbYWJpKGVtYmVkX3YwKV0KICAgIGltcGwgTW9ja0FNTUltcGwgb2YgSU1vY2tBTU08Q29udHJhY3RTdGF0ZT4gewogICAgICAgIGZuIHN3YXAoCiAgICAgICAgICAgIHJlZiBzZWxmOiBDb250cmFjdFN0YXRlLAogICAgICAgICAgICBpbl90b2tlbjogQ29udHJhY3RBZGRyZXNzLAogICAgICAgICAgICBvdXRfdG9rZW46IENvbnRyYWN0QWRkcmVzcywKICAgICAgICAgICAgYW1vdW50OiB1MjU2LAogICAgICAgICkgewogICAgICAgICAgICBsZXQgY2FsbGVyID0gZ2V0X2NhbGxlcl9hZGRyZXNzKCk7CgogICAgICAgICAgICAvLyBUcmFuc2ZlciBpbnB1dCB0b2tlbnMgZnJvbSBjYWxsZXIuCiAgICAgICAgICAgIElFUkMyMERpc3BhdGNoZXIgeyBjb250cmFjdF9hZGRyZXNzOiBpbl90b2tlbiB9CiAgICAgICAgICAgICAgICAudHJhbnNmZXJfZnJvbShzZW5kZXI6IGNhbGxlciwgcmVjaXBpZW50OiBnZXRfY29udHJhY3RfYWRkcmVzcygpLCA6YW1vdW50KTsKCiAgICAgICAgICAgIC8vIFRyYW5zZmVyIG91dHB1dCB0b2tlbnMgKDE6MSBleGNoYW5nZSkuCiAgICAgICAgICAgIElFUkMyMERpc3BhdGNoZXIgeyBjb250cmFjdF9hZGRyZXNzOiBvdXRfdG9rZW4gfS50cmFuc2ZlcihyZWNpcGllbnQ6IGNhbGxlciwgOmFtb3VudCk7CiAgICAgICAgfQogICAgfQp9Cg==",
  },
  {
    fileName: "SwapHelper.cairo",
    code: "Ly8gQWRhcHRlZCBmcm9tIHN0YXJrbmV0LXByaXZhY3kgcGFja2FnZXMvcHJpdmFjeS9zcmMvdGVzdF9jb250cmFjdHMvbW9ja19zd2FwX2V4ZWN1dG9yLmNhaXJvCi8vIChBcGFjaGUtMi4wLCBTdGFya1dhcmUpLiBSZW5hbWVkIE1vY2tTd2FwRXhlY3V0b3IgLT4gU3dhcEhlbHBlciBmb3IgdGhlIHR1dG9yaWFsLgp1c2UgcHJpdmFjeTo6b2JqZWN0czo6T3Blbk5vdGVEZXBvc2l0Owp1c2Ugc3RhcmtuZXQ6OkNvbnRyYWN0QWRkcmVzczsKCiNbc3RhcmtuZXQ6OmludGVyZmFjZV0KcHViIHRyYWl0IElTd2FwSGVscGVyPFQ+IHsKICAgIC8vLyBFeGVjdXRlcyBhIHN3YXAgb24gYW4gZXh0ZXJuYWwgQU1NL0RFWCBhbmQgZGVwb3NpdHMgdGhlIHJlc3VsdCB0byBhbiBvcGVuIG5vdGUuCiAgICAvLy8KICAgIC8vLyBDYWxsZWQgYnkgdGhlIHByaXZhY3kgY29udHJhY3QgdmlhIHRoZSBgSU5WT0tFX1NFTEVDVE9SYC4KICAgIC8vLwogICAgLy8vIC0gYGluX3Rva2VuYCAtIFRoZSB0b2tlbiBhZGRyZXNzIG9mIHRoZSBpbnB1dCBmdW5kcy4KICAgIC8vLyAtIGBvdXRfdG9rZW5gIC0gVGhlIHRva2VuIGFkZHJlc3Mgb2YgdGhlIG91dHB1dCBmdW5kcy4KICAgIC8vLyAtIGBpbl9hbW91bnRgIC0gVGhlIGFtb3VudCBvZiBpbnB1dCBmdW5kcyB0byBzd2FwLgogICAgLy8vIC0gYG5vdGVfaWRgIC0gVGhlIGlkZW50aWZpZXIgb2YgdGhlIG9wZW4gbm90ZSB0byBkZXBvc2l0IHRoZSBvdXRwdXQgdG8uCiAgICAvLy8KICAgIC8vLyAjIyMjIEZsb3cKICAgIC8vLyAxLiBBcHByb3ZlcyBzd2FwIGNvbnRyYWN0IHRvIHNwZW5kIGBpbl9hbW91bnRgIG9mIGluIHRva2Vucy4KICAgIC8vLyAyLiBSZWNvcmRzIG91dHB1dCB0b2tlbiBiYWxhbmNlLCBleGVjdXRlcyB0aGUgc3dhcCwgY2FsY3VsYXRlcyByZWNlaXZlZCBhbW91bnQuCiAgICAvLy8gMy4gQXBwcm92ZXMgdGhlIGNhbGxlciAocHJpdmFjeSBjb250cmFjdCkgdG8gdHJhbnNmZXIgdGhlIHJlY2VpdmVkIG91dHB1dCBmdW5kcy4KICAgIC8vLyA0LiBSZXR1cm5zIGEgc3BhbiBvZiBgT3Blbk5vdGVEZXBvc2l0YCBmb3IgdGhlIHByaXZhY3kgY29udHJhY3QgdG8gYXBwbHkuCiAgICBmbiBwcml2YWN5X2ludm9rZSgKICAgICAgICByZWYgc2VsZjogVCwKICAgICAgICBpbl90b2tlbjogQ29udHJhY3RBZGRyZXNzLAogICAgICAgIG91dF90b2tlbjogQ29udHJhY3RBZGRyZXNzLAogICAgICAgIGluX2Ftb3VudDogdTEyOCwKICAgICAgICBub3RlX2lkOiBmZWx0MjUyLAogICAgKSAtPiBTcGFuPE9wZW5Ob3RlRGVwb3NpdD47Cn0KCnB1YiBtb2QgZXJyb3JzIHsKICAgIHB1YiBjb25zdCBaRVJPX0lOX1RPS0VOOiBmZWx0MjUyID0gJ1pFUk9fSU5fVE9LRU4nOwogICAgcHViIGNvbnN0IFpFUk9fT1VUX1RPS0VOOiBmZWx0MjUyID0gJ1pFUk9fT1VUX1RPS0VOJzsKICAgIHB1YiBjb25zdCBaRVJPX0lOX0FNT1VOVDogZmVsdDI1MiA9ICdaRVJPX0lOX0FNT1VOVCc7CiAgICBwdWIgY29uc3QgSU5fVE9LRU5fRVFVQUxfVE9fT1VUX1RPS0VOOiBmZWx0MjUyID0gJ0lOX1RPS0VOX0VRVUFMX1RPX09VVF9UT0tFTic7CiAgICBwdWIgY29uc3QgSU5TVUZGSUNJRU5UX0JBTEFOQ0U6IGZlbHQyNTIgPSAnSU5TVUZGSUNJRU5UX0JBTEFOQ0UnOwogICAgcHViIGNvbnN0IFpFUk9fQU1NX0FERFJFU1M6IGZlbHQyNTIgPSAnWkVST19BTU1fQUREUkVTUyc7CiAgICBwdWIgY29uc3QgWkVST19TRUxFQ1RPUjogZmVsdDI1MiA9ICdaRVJPX1NFTEVDVE9SJzsKICAgIHB1YiBjb25zdCBSRUNFSVZFRF9BTU9VTlRfT1ZFUkZMT1c6IGZlbHQyNTIgPSAnUkVDRUlWRURfQU1PVU5UX09WRVJGTE9XJzsKICAgIHB1YiBjb25zdCBaRVJPX09VVF9BTU9VTlQ6IGZlbHQyNTIgPSAnWkVST19PVVRfQU1PVU5UJzsKfQoKI1tzdGFya25ldDo6Y29udHJhY3RdCnB1YiBtb2QgU3dhcEhlbHBlciB7CiAgICB1c2UgY29yZTo6bnVtOjp0cmFpdHM6Olplcm87CiAgICB1c2Ugb3BlbnplcHBlbGluOjppbnRlcmZhY2VzOjp0b2tlbjo6ZXJjMjA6OntJRVJDMjBEaXNwYXRjaGVyLCBJRVJDMjBEaXNwYXRjaGVyVHJhaXR9OwogICAgdXNlIHByaXZhY3k6Om9iamVjdHM6Ok9wZW5Ob3RlRGVwb3NpdDsKICAgIHVzZSBzdGFya25ldDo6c3RvcmFnZTo6e1N0b3JhZ2VQb2ludGVyUmVhZEFjY2VzcywgU3RvcmFnZVBvaW50ZXJXcml0ZUFjY2Vzc307CiAgICB1c2Ugc3RhcmtuZXQ6OnN5c2NhbGxzOjpjYWxsX2NvbnRyYWN0X3N5c2NhbGw7CiAgICB1c2Ugc3RhcmtuZXQ6OntDb250cmFjdEFkZHJlc3MsIFN5c2NhbGxSZXN1bHRUcmFpdCwgZ2V0X2NhbGxlcl9hZGRyZXNzLCBnZXRfY29udHJhY3RfYWRkcmVzc307CiAgICB1c2Ugc3VwZXI6OntJU3dhcEhlbHBlciwgZXJyb3JzfTsKCiAgICAjW3N0b3JhZ2VdCiAgICBzdHJ1Y3QgU3RvcmFnZSB7CiAgICAgICAgYW1tX2FkZHJlc3M6IENvbnRyYWN0QWRkcmVzcywKICAgICAgICBzZWxlY3RvcjogZmVsdDI1MiwKICAgIH0KCiAgICAjW2NvbnN0cnVjdG9yXQogICAgZm4gY29uc3RydWN0b3IocmVmIHNlbGY6IENvbnRyYWN0U3RhdGUsIGFtbV9hZGRyZXNzOiBDb250cmFjdEFkZHJlc3MsIHNlbGVjdG9yOiBmZWx0MjUyKSB7CiAgICAgICAgYXNzZXJ0KGFtbV9hZGRyZXNzLmlzX25vbl96ZXJvKCksIGVycm9yczo6WkVST19BTU1fQUREUkVTUyk7CiAgICAgICAgYXNzZXJ0KHNlbGVjdG9yLmlzX25vbl96ZXJvKCksIGVycm9yczo6WkVST19TRUxFQ1RPUik7CiAgICAgICAgc2VsZi5hbW1fYWRkcmVzcy53cml0ZShhbW1fYWRkcmVzcyk7CiAgICAgICAgc2VsZi5zZWxlY3Rvci53cml0ZShzZWxlY3Rvcik7CiAgICB9CgogICAgI1thYmkoZW1iZWRfdjApXQogICAgcHViIGltcGwgU3dhcEhlbHBlckltcGwgb2YgSVN3YXBIZWxwZXI8Q29udHJhY3RTdGF0ZT4gewogICAgICAgIGZuIHByaXZhY3lfaW52b2tlKAogICAgICAgICAgICByZWYgc2VsZjogQ29udHJhY3RTdGF0ZSwKICAgICAgICAgICAgaW5fdG9rZW46IENvbnRyYWN0QWRkcmVzcywKICAgICAgICAgICAgb3V0X3Rva2VuOiBDb250cmFjdEFkZHJlc3MsCiAgICAgICAgICAgIGluX2Ftb3VudDogdTEyOCwKICAgICAgICAgICAgbm90ZV9pZDogZmVsdDI1MiwKICAgICAgICApIC0+IFNwYW48T3Blbk5vdGVEZXBvc2l0PiB7CiAgICAgICAgICAgIGFzc2VydChpbl90b2tlbi5pc19ub25femVybygpLCBlcnJvcnM6OlpFUk9fSU5fVE9LRU4pOwogICAgICAgICAgICBhc3NlcnQob3V0X3Rva2VuLmlzX25vbl96ZXJvKCksIGVycm9yczo6WkVST19PVVRfVE9LRU4pOwogICAgICAgICAgICBhc3NlcnQoaW5fYW1vdW50LmlzX25vbl96ZXJvKCksIGVycm9yczo6WkVST19JTl9BTU9VTlQpOwogICAgICAgICAgICBhc3NlcnQoaW5fdG9rZW4gIT0gb3V0X3Rva2VuLCBlcnJvcnM6OklOX1RPS0VOX0VRVUFMX1RPX09VVF9UT0tFTik7CgogICAgICAgICAgICBsZXQgc2VsZl9hZGRyID0gZ2V0X2NvbnRyYWN0X2FkZHJlc3MoKTsKICAgICAgICAgICAgbGV0IHByaXZhY3lfYWRkciA9IGdldF9jYWxsZXJfYWRkcmVzcygpOwogICAgICAgICAgICBsZXQgaW5fZXJjMjAgPSBJRVJDMjBEaXNwYXRjaGVyIHsgY29udHJhY3RfYWRkcmVzczogaW5fdG9rZW4gfTsKICAgICAgICAgICAgbGV0IG91dF9lcmMyMCA9IElFUkMyMERpc3BhdGNoZXIgeyBjb250cmFjdF9hZGRyZXNzOiBvdXRfdG9rZW4gfTsKCiAgICAgICAgICAgIC8vIEFwcHJvdmUgQU1NIHRvIHNwZW5kIGBpbl9hbW91bnRgIG9mIGBpbl90b2tlbmAuCiAgICAgICAgICAgIGFzc2VydCgKICAgICAgICAgICAgICAgIGluX2VyYzIwLmJhbGFuY2Vfb2YoYWNjb3VudDogc2VsZl9hZGRyKSA+PSBpbl9hbW91bnQuaW50bygpLAogICAgICAgICAgICAgICAgZXJyb3JzOjpJTlNVRkZJQ0lFTlRfQkFMQU5DRSwKICAgICAgICAgICAgKTsKICAgICAgICAgICAgbGV0IGFtbV9hZGRyZXNzID0gc2VsZi5hbW1fYWRkcmVzcy5yZWFkKCk7CiAgICAgICAgICAgIGluX2VyYzIwLmFwcHJvdmUoc3BlbmRlcjogYW1tX2FkZHJlc3MsIGFtb3VudDogaW5fYW1vdW50LmludG8oKSk7CgogICAgICAgICAgICAvLyBHZXQgb3V0cHV0IHRva2VuIGJhbGFuY2UgYmVmb3JlIHN3YXAuCiAgICAgICAgICAgIGxldCBiYWxhbmNlX2JlZm9yZSA9IG91dF9lcmMyMC5iYWxhbmNlX29mKGFjY291bnQ6IHNlbGZfYWRkcik7CgogICAgICAgICAgICAvLyBFeGVjdXRlIHN3YXAgKHByb3BhZ2F0ZXMgZXJyb3IgZnJvbSBBTU0gaWYgaXQgZmFpbHMpLgogICAgICAgICAgICBjYWxsX2NvbnRyYWN0X3N5c2NhbGwoCiAgICAgICAgICAgICAgICBhZGRyZXNzOiBhbW1fYWRkcmVzcywKICAgICAgICAgICAgICAgIGVudHJ5X3BvaW50X3NlbGVjdG9yOiBzZWxmLnNlbGVjdG9yLnJlYWQoKSwKICAgICAgICAgICAgICAgIGNhbGxkYXRhOiBbaW5fdG9rZW4uaW50bygpLCBvdXRfdG9rZW4uaW50bygpLCBpbl9hbW91bnQuaW50bygpLCAwXS5zcGFuKCksCiAgICAgICAgICAgICkKICAgICAgICAgICAgICAgIC51bndyYXBfc3lzY2FsbCgpOwoKICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIG91dHB1dCBhbW91bnQuCiAgICAgICAgICAgIGxldCBiYWxhbmNlX2FmdGVyID0gb3V0X2VyYzIwLmJhbGFuY2Vfb2YoYWNjb3VudDogc2VsZl9hZGRyKTsKICAgICAgICAgICAgbGV0IG91dF9hbW91bnQ6IHUxMjggPSAoYmFsYW5jZV9hZnRlciAtIGJhbGFuY2VfYmVmb3JlKQogICAgICAgICAgICAgICAgLnRyeV9pbnRvKCkKICAgICAgICAgICAgICAgIC5leHBlY3QoZXJyb3JzOjpSRUNFSVZFRF9BTU9VTlRfT1ZFUkZMT1cpOwogICAgICAgICAgICBhc3NlcnQob3V0X2Ftb3VudC5pc19ub25femVybygpLCBlcnJvcnM6OlpFUk9fT1VUX0FNT1VOVCk7CgogICAgICAgICAgICAvLyBBcHByb3ZlIGNhbGxlciAocHJpdmFjeSBjb250cmFjdCkgdG8gdHJhbnNmZXIgcmVjZWl2ZWQgb3V0cHV0IGZ1bmRzLgogICAgICAgICAgICBvdXRfZXJjMjAuYXBwcm92ZShzcGVuZGVyOiBwcml2YWN5X2FkZHIsIGFtb3VudDogb3V0X2Ftb3VudC5pbnRvKCkpOwoKICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBvcGVuIG5vdGUgZGVwb3NpdCBzdHJ1Y3QuCiAgICAgICAgICAgIFtPcGVuTm90ZURlcG9zaXQgeyBub3RlX2lkLCB0b2tlbjogb3V0X3Rva2VuLCBhbW91bnQ6IG91dF9hbW91bnQgfV0uc3BhbigpCiAgICAgICAgfQogICAgfQp9Cg==",
  },
]

// Raw markdown source, for "View as Markdown" / "Copy for LLM".
export const markdown = `
The swap helper lets pool funds trade on an external AMM without revealing the
trader. The pool withdraws the input token to the helper, the helper swaps on the
AMM, and the received amount is credited to an open note - all in one atomic
transaction.

This is the canonical template for **any** DEX integration: only the AMM call in
the middle changes.

\`\`\`cairo
// Adapted from starknet-privacy packages/privacy/src/test_contracts/mock_swap_executor.cairo
// (Apache-2.0, StarkWare). Renamed MockSwapExecutor -> SwapHelper for the tutorial.
use privacy::objects::OpenNoteDeposit;
use starknet::ContractAddress;

#[starknet::interface]
pub trait ISwapHelper<T> {
    /// Executes a swap on an external AMM/DEX and deposits the result to an open note.
    ///
    /// Called by the privacy contract via the \`INVOKE_SELECTOR\`.
    ///
    /// - \`in_token\` - The token address of the input funds.
    /// - \`out_token\` - The token address of the output funds.
    /// - \`in_amount\` - The amount of input funds to swap.
    /// - \`note_id\` - The identifier of the open note to deposit the output to.
    ///
    /// #### Flow
    /// 1. Approves swap contract to spend \`in_amount\` of in tokens.
    /// 2. Records output token balance, executes the swap, calculates received amount.
    /// 3. Approves the caller (privacy contract) to transfer the received output funds.
    /// 4. Returns a span of \`OpenNoteDeposit\` for the privacy contract to apply.
    fn privacy_invoke(
        ref self: T,
        in_token: ContractAddress,
        out_token: ContractAddress,
        in_amount: u128,
        note_id: felt252,
    ) -> Span<OpenNoteDeposit>;
}

pub mod errors {
    pub const ZERO_IN_TOKEN: felt252 = 'ZERO_IN_TOKEN';
    pub const ZERO_OUT_TOKEN: felt252 = 'ZERO_OUT_TOKEN';
    pub const ZERO_IN_AMOUNT: felt252 = 'ZERO_IN_AMOUNT';
    pub const IN_TOKEN_EQUAL_TO_OUT_TOKEN: felt252 = 'IN_TOKEN_EQUAL_TO_OUT_TOKEN';
    pub const INSUFFICIENT_BALANCE: felt252 = 'INSUFFICIENT_BALANCE';
    pub const ZERO_AMM_ADDRESS: felt252 = 'ZERO_AMM_ADDRESS';
    pub const ZERO_SELECTOR: felt252 = 'ZERO_SELECTOR';
    pub const RECEIVED_AMOUNT_OVERFLOW: felt252 = 'RECEIVED_AMOUNT_OVERFLOW';
    pub const ZERO_OUT_AMOUNT: felt252 = 'ZERO_OUT_AMOUNT';
}

#[starknet::contract]
pub mod SwapHelper {
    use core::num::traits::Zero;
    use openzeppelin::interfaces::token::erc20::{IERC20Dispatcher, IERC20DispatcherTrait};
    use privacy::objects::OpenNoteDeposit;
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
    use starknet::syscalls::call_contract_syscall;
    use starknet::{ContractAddress, SyscallResultTrait, get_caller_address, get_contract_address};
    use super::{ISwapHelper, errors};

    #[storage]
    struct Storage {
        amm_address: ContractAddress,
        selector: felt252,
    }

    #[constructor]
    fn constructor(ref self: ContractState, amm_address: ContractAddress, selector: felt252) {
        assert(amm_address.is_non_zero(), errors::ZERO_AMM_ADDRESS);
        assert(selector.is_non_zero(), errors::ZERO_SELECTOR);
        self.amm_address.write(amm_address);
        self.selector.write(selector);
    }

    #[abi(embed_v0)]
    pub impl SwapHelperImpl of ISwapHelper<ContractState> {
        fn privacy_invoke(
            ref self: ContractState,
            in_token: ContractAddress,
            out_token: ContractAddress,
            in_amount: u128,
            note_id: felt252,
        ) -> Span<OpenNoteDeposit> {
            assert(in_token.is_non_zero(), errors::ZERO_IN_TOKEN);
            assert(out_token.is_non_zero(), errors::ZERO_OUT_TOKEN);
            assert(in_amount.is_non_zero(), errors::ZERO_IN_AMOUNT);
            assert(in_token != out_token, errors::IN_TOKEN_EQUAL_TO_OUT_TOKEN);

            let self_addr = get_contract_address();
            let privacy_addr = get_caller_address();
            let in_erc20 = IERC20Dispatcher { contract_address: in_token };
            let out_erc20 = IERC20Dispatcher { contract_address: out_token };

            // Approve AMM to spend \`in_amount\` of \`in_token\`.
            assert(
                in_erc20.balance_of(account: self_addr) >= in_amount.into(),
                errors::INSUFFICIENT_BALANCE,
            );
            let amm_address = self.amm_address.read();
            in_erc20.approve(spender: amm_address, amount: in_amount.into());

            // Get output token balance before swap.
            let balance_before = out_erc20.balance_of(account: self_addr);

            // Execute swap (propagates error from AMM if it fails).
            call_contract_syscall(
                address: amm_address,
                entry_point_selector: self.selector.read(),
                calldata: [in_token.into(), out_token.into(), in_amount.into(), 0].span(),
            )
                .unwrap_syscall();

            // Calculate output amount.
            let balance_after = out_erc20.balance_of(account: self_addr);
            let out_amount: u128 = (balance_after - balance_before)
                .try_into()
                .expect(errors::RECEIVED_AMOUNT_OVERFLOW);
            assert(out_amount.is_non_zero(), errors::ZERO_OUT_AMOUNT);

            // Approve caller (privacy contract) to transfer received output funds.
            out_erc20.approve(spender: privacy_addr, amount: out_amount.into());

            // Return the open note deposit struct.
            [OpenNoteDeposit { note_id, token: out_token, amount: out_amount }].span()
        }
    }
}

\`\`\`

The demo AMM it targets is a trivial 1:1 exchange - in production this would be
Ekubo, JediSwap, or any other DEX:

\`\`\`cairo
// Adapted from starknet-privacy packages/privacy/src/test_contracts/mock_amm.cairo
// (Apache-2.0, StarkWare). Test-only entry points removed.
use starknet::ContractAddress;

/// Interface for the mock AMM.
#[starknet::interface]
pub trait IMockAMM<T> {
    fn swap(ref self: T, in_token: ContractAddress, out_token: ContractAddress, amount: u256);
}

/// Mock AMM contract used to demo the swap helper.
/// Implements a simple 1:1 swap.
#[starknet::contract]
pub mod MockAMM {
    use openzeppelin::interfaces::token::erc20::{IERC20Dispatcher, IERC20DispatcherTrait};
    use starknet::{ContractAddress, get_caller_address, get_contract_address};
    use super::IMockAMM;

    #[storage]
    struct Storage {}

    #[constructor]
    fn constructor(ref self: ContractState) {}

    #[abi(embed_v0)]
    impl MockAMMImpl of IMockAMM<ContractState> {
        fn swap(
            ref self: ContractState,
            in_token: ContractAddress,
            out_token: ContractAddress,
            amount: u256,
        ) {
            let caller = get_caller_address();

            // Transfer input tokens from caller.
            IERC20Dispatcher { contract_address: in_token }
                .transfer_from(sender: caller, recipient: get_contract_address(), :amount);

            // Transfer output tokens (1:1 exchange).
            IERC20Dispatcher { contract_address: out_token }.transfer(recipient: caller, :amount);
        }
    }
}

\`\`\`

## The balance-delta idiom

The helper never trusts the AMM's return value. It measures what actually
arrived:

\`\`\`
balance_before = out_token.balance_of(helper)
...swap...
out_amount = out_token.balance_of(helper) - balance_before
\`\`\`

This is what makes the pattern universal - it works with any external protocol
regardless of its interface, handles fees-on-transfer, and guarantees the open
note is credited with exactly the tokens the pool can actually pull.

## Things to notice

- **The AMM is pinned at deployment** - \`amm_address\` and the swap \`selector\` are
  constructor parameters, so a deployed helper is a fixed, auditable route.
- **\`call_contract_syscall\`** invokes the AMM generically; an AMM revert
  propagates and aborts the whole pool transaction - no funds move.
- **Overflow guard** - the delta is \`u256 → u128\` converted with an explicit
  error; a manipulated token cannot smuggle an oversized amount into a note.
- **\`ZERO_OUT_AMOUNT\` guard** - a swap that returns nothing reverts instead of
  crediting an empty note.
- **The trader is never on-chain** - observers see pool → helper → AMM → helper.
  The open note's owner stays hidden.

Next: the same pattern pointed at a real lending protocol - the Vesu helper.
`

const html = `<p>The swap helper lets pool funds trade on an external AMM without revealing the
trader. The pool withdraws the input token to the helper, the helper swaps on the
AMM, and the received amount is credited to an open note - all in one atomic
transaction.</p>
<p>This is the canonical template for <strong>any</strong> DEX integration: only the AMM call in
the middle changes.</p>
<pre><code class="language-cairo"><span class="hljs-comment">// Adapted from starknet-privacy packages/privacy/src/test_contracts/mock_swap_executor.cairo</span>
<span class="hljs-comment">// (Apache-2.0, StarkWare). Renamed MockSwapExecutor -&gt; SwapHelper for the tutorial.</span>
<span class="hljs-keyword">use</span> privacy::objects::OpenNoteDeposit;
<span class="hljs-keyword">use</span> starknet::ContractAddress;

<span class="hljs-meta">#[starknet::interface]</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">trait</span> <span class="hljs-title class_">ISwapHelper</span>&lt;T&gt; {
    <span class="hljs-comment">/// Executes a swap on an external AMM/DEX and deposits the result to an open note.</span>
    <span class="hljs-comment">///</span>
    <span class="hljs-comment">/// Called by the privacy contract via the \`INVOKE_SELECTOR\`.</span>
    <span class="hljs-comment">///</span>
    <span class="hljs-comment">/// - \`in_token\` - The token address of the input funds.</span>
    <span class="hljs-comment">/// - \`out_token\` - The token address of the output funds.</span>
    <span class="hljs-comment">/// - \`in_amount\` - The amount of input funds to swap.</span>
    <span class="hljs-comment">/// - \`note_id\` - The identifier of the open note to deposit the output to.</span>
    <span class="hljs-comment">///</span>
    <span class="hljs-comment">/// #### Flow</span>
    <span class="hljs-comment">/// 1. Approves swap contract to spend \`in_amount\` of in tokens.</span>
    <span class="hljs-comment">/// 2. Records output token balance, executes the swap, calculates received amount.</span>
    <span class="hljs-comment">/// 3. Approves the caller (privacy contract) to transfer the received output funds.</span>
    <span class="hljs-comment">/// 4. Returns a span of \`OpenNoteDeposit\` for the privacy contract to apply.</span>
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">privacy_invoke</span>(
        <span class="hljs-keyword">ref</span> <span class="hljs-keyword">self</span>: T,
        in_token: ContractAddress,
        out_token: ContractAddress,
        in_amount: <span class="hljs-type">u128</span>,
        note_id: felt252,
    ) <span class="hljs-punctuation">-&gt;</span> Span&lt;OpenNoteDeposit&gt;;
}

<span class="hljs-keyword">pub</span> <span class="hljs-keyword">mod</span> errors {
    <span class="hljs-keyword">pub</span> <span class="hljs-keyword">const</span> ZERO_IN_TOKEN: felt252 = <span class="hljs-symbol">&#x27;ZERO_IN_TOKE</span>N<span class="hljs-string">&#x27;;
    pub const ZERO_OUT_TOKEN: felt252 = &#x27;</span>ZERO_OUT_TOKEN<span class="hljs-string">&#x27;;
    pub const ZERO_IN_AMOUNT: felt252 = &#x27;</span>ZERO_IN_AMOUNT<span class="hljs-string">&#x27;;
    pub const IN_TOKEN_EQUAL_TO_OUT_TOKEN: felt252 = &#x27;</span>IN_TOKEN_EQUAL_TO_OUT_TOKEN<span class="hljs-string">&#x27;;
    pub const INSUFFICIENT_BALANCE: felt252 = &#x27;</span>INSUFFICIENT_BALANCE<span class="hljs-string">&#x27;;
    pub const ZERO_AMM_ADDRESS: felt252 = &#x27;</span>ZERO_AMM_ADDRESS<span class="hljs-string">&#x27;;
    pub const ZERO_SELECTOR: felt252 = &#x27;</span>ZERO_SELECTOR<span class="hljs-string">&#x27;;
    pub const RECEIVED_AMOUNT_OVERFLOW: felt252 = &#x27;</span>RECEIVED_AMOUNT_OVERFLOW<span class="hljs-string">&#x27;;
    pub const ZERO_OUT_AMOUNT: felt252 = &#x27;</span>ZERO_OUT_AMOUNT<span class="hljs-string">&#x27;;
}

#[starknet::contract]
pub mod SwapHelper {
    use core::num::traits::Zero;
    use openzeppelin::interfaces::token::erc20::{IERC20Dispatcher, IERC20DispatcherTrait};
    use privacy::objects::OpenNoteDeposit;
    use starknet::storage::{StoragePointerReadAccess, StoragePointerWriteAccess};
    use starknet::syscalls::call_contract_syscall;
    use starknet::{ContractAddress, SyscallResultTrait, get_caller_address, get_contract_address};
    use super::{ISwapHelper, errors};

    #[storage]
    struct Storage {
        amm_address: ContractAddress,
        selector: felt252,
    }

    #[constructor]
    fn constructor(ref self: ContractState, amm_address: ContractAddress, selector: felt252) {
        assert(amm_address.is_non_zero(), errors::ZERO_AMM_ADDRESS);
        assert(selector.is_non_zero(), errors::ZERO_SELECTOR);
        self.amm_address.write(amm_address);
        self.selector.write(selector);
    }

    #[abi(embed_v0)]
    pub impl SwapHelperImpl of ISwapHelper&lt;ContractState&gt; {
        fn privacy_invoke(
            ref self: ContractState,
            in_token: ContractAddress,
            out_token: ContractAddress,
            in_amount: u128,
            note_id: felt252,
        ) -&gt; Span&lt;OpenNoteDeposit&gt; {
            assert(in_token.is_non_zero(), errors::ZERO_IN_TOKEN);
            assert(out_token.is_non_zero(), errors::ZERO_OUT_TOKEN);
            assert(in_amount.is_non_zero(), errors::ZERO_IN_AMOUNT);
            assert(in_token != out_token, errors::IN_TOKEN_EQUAL_TO_OUT_TOKEN);

            let self_addr = get_contract_address();
            let privacy_addr = get_caller_address();
            let in_erc20 = IERC20Dispatcher { contract_address: in_token };
            let out_erc20 = IERC20Dispatcher { contract_address: out_token };

            // Approve AMM to spend \`in_amount\` of \`in_token\`.
            assert(
                in_erc20.balance_of(account: self_addr) &gt;= in_amount.into(),
                errors::INSUFFICIENT_BALANCE,
            );
            let amm_address = self.amm_address.read();
            in_erc20.approve(spender: amm_address, amount: in_amount.into());

            // Get output token balance before swap.
            let balance_before = out_erc20.balance_of(account: self_addr);

            // Execute swap (propagates error from AMM if it fails).
            call_contract_syscall(
                address: amm_address,
                entry_point_selector: self.selector.read(),
                calldata: [in_token.into(), out_token.into(), in_amount.into(), 0].span(),
            )
                .unwrap_syscall();

            // Calculate output amount.
            let balance_after = out_erc20.balance_of(account: self_addr);
            let out_amount: u128 = (balance_after - balance_before)
                .try_into()
                .expect(errors::RECEIVED_AMOUNT_OVERFLOW);
            assert(out_amount.is_non_zero(), errors::ZERO_OUT_AMOUNT);

            // Approve caller (privacy contract) to transfer received output funds.
            out_erc20.approve(spender: privacy_addr, amount: out_amount.into());

            // Return the open note deposit struct.
            [OpenNoteDeposit { note_id, token: out_token, amount: out_amount }].span()
        }
    }
}
</span>
</code></pre><p>The demo AMM it targets is a trivial 1:1 exchange - in production this would be
Ekubo, JediSwap, or any other DEX:</p>
<pre><code class="language-cairo"><span class="hljs-comment">// Adapted from starknet-privacy packages/privacy/src/test_contracts/mock_amm.cairo</span>
<span class="hljs-comment">// (Apache-2.0, StarkWare). Test-only entry points removed.</span>
<span class="hljs-keyword">use</span> starknet::ContractAddress;

<span class="hljs-comment">/// Interface for the mock AMM.</span>
<span class="hljs-meta">#[starknet::interface]</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">trait</span> <span class="hljs-title class_">IMockAMM</span>&lt;T&gt; {
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">swap</span>(<span class="hljs-keyword">ref</span> <span class="hljs-keyword">self</span>: T, in_token: ContractAddress, out_token: ContractAddress, amount: u256);
}

<span class="hljs-comment">/// Mock AMM contract used to demo the swap helper.</span>
<span class="hljs-comment">/// Implements a simple 1:1 swap.</span>
<span class="hljs-meta">#[starknet::contract]</span>
<span class="hljs-keyword">pub</span> <span class="hljs-keyword">mod</span> MockAMM {
    <span class="hljs-keyword">use</span> openzeppelin::interfaces::token::erc20::{IERC20Dispatcher, IERC20DispatcherTrait};
    <span class="hljs-keyword">use</span> starknet::{ContractAddress, get_caller_address, get_contract_address};
    <span class="hljs-keyword">use</span> super::IMockAMM;

    <span class="hljs-meta">#[storage]</span>
    <span class="hljs-keyword">struct</span> <span class="hljs-title class_">Storage</span> {}

    <span class="hljs-meta">#[constructor]</span>
    <span class="hljs-keyword">fn</span> <span class="hljs-title function_">constructor</span>(<span class="hljs-keyword">ref</span> <span class="hljs-keyword">self</span>: ContractState) {}

    <span class="hljs-meta">#[abi(embed_v0)]</span>
    <span class="hljs-keyword">impl</span> <span class="hljs-title class_">MockAMMImpl</span> of IMockAMM&lt;ContractState&gt; {
        <span class="hljs-keyword">fn</span> <span class="hljs-title function_">swap</span>(
            <span class="hljs-keyword">ref</span> <span class="hljs-keyword">self</span>: ContractState,
            in_token: ContractAddress,
            out_token: ContractAddress,
            amount: u256,
        ) {
            <span class="hljs-keyword">let</span> <span class="hljs-variable">caller</span> = <span class="hljs-title function_ invoke__">get_caller_address</span>();

            <span class="hljs-comment">// Transfer input tokens from caller.</span>
            IERC20Dispatcher { contract_address: in_token }
                .<span class="hljs-title function_ invoke__">transfer_from</span>(sender: caller, recipient: <span class="hljs-title function_ invoke__">get_contract_address</span>(), :amount);

            <span class="hljs-comment">// Transfer output tokens (1:1 exchange).</span>
            IERC20Dispatcher { contract_address: out_token }.<span class="hljs-title function_ invoke__">transfer</span>(recipient: caller, :amount);
        }
    }
}
</code></pre><h2 id="the-balance-delta-idiom">The balance-delta idiom<a class="anchor" href="#the-balance-delta-idiom" aria-label="Link to this section">#</a></h2>
<p>The helper never trusts the AMM&#39;s return value. It measures what actually
arrived:</p>
<pre><code>balance_before = out_token.balance_of(helper)
...swap...
out_amount = out_token.balance_of(helper) - balance_before
</code></pre><p>This is what makes the pattern universal - it works with any external protocol
regardless of its interface, handles fees-on-transfer, and guarantees the open
note is credited with exactly the tokens the pool can actually pull.</p>
<h2 id="things-to-notice">Things to notice<a class="anchor" href="#things-to-notice" aria-label="Link to this section">#</a></h2>
<ul>
<li><strong>The AMM is pinned at deployment</strong> - <code>amm_address</code> and the swap <code>selector</code> are
constructor parameters, so a deployed helper is a fixed, auditable route.</li>
<li><strong><code>call_contract_syscall</code></strong> invokes the AMM generically; an AMM revert
propagates and aborts the whole pool transaction - no funds move.</li>
<li><strong>Overflow guard</strong> - the delta is <code>u256 → u128</code> converted with an explicit
error; a manipulated token cannot smuggle an oversized amount into a note.</li>
<li><strong><code>ZERO_OUT_AMOUNT</code> guard</strong> - a swap that returns nothing reverts instead of
crediting an empty note.</li>
<li><strong>The trader is never on-chain</strong> - observers see pool → helper → AMM → helper.
The open note&#39;s owner stays hidden.</li>
</ul>
<p>Next: the same pattern pointed at a real lending protocol - the Vesu helper.</p>
`

export default html
