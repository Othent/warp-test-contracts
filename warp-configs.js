import { WarpFactory, defaultCacheOptions } from 'warp-contracts';
import { DeployPlugin, ArweaveSigner } from 'warp-contracts-plugin-deploy';
import { LmdbCache } from 'warp-contracts-lmdb'


async function warp(network) {
  
  if (network === 'mainNet') {
    
    const warp = WarpFactory.forMainnet().use(new DeployPlugin())
    .useStateCache(new LmdbCache(
      { ...defaultCacheOptions, dbLocation: `./cache/warp/mainNet/state` }, 
      { maxEntriesPerContract: 100, minEntriesPerContract: 10 }
    ))
    .useContractCache(
      new LmdbCache({ ...defaultCacheOptions, dbLocation: `./cache/warp/mainNet/contracts` }), 
      new LmdbCache({ ...defaultCacheOptions, dbLocation: `./cache/warp/mainNet/src` }
    ));
    return warp

  } else if (network === 'testNet') {

    const warp = WarpFactory.forTestnet().use(new DeployPlugin())
    .useStateCache(new LmdbCache(
      { ...defaultCacheOptions, dbLocation: `./cache/warp/testNet/state` }, 
      { maxEntriesPerContract: 100, minEntriesPerContract: 10 }
    ))
    .useContractCache(
      new LmdbCache({ ...defaultCacheOptions, dbLocation: `./cache/warp/testNet/contracts` }), 
      new LmdbCache({ ...defaultCacheOptions, dbLocation: `./cache/warp/testNet/src` }
    ));
    return warp

  } else {
      throw new Error('Error init warp!')
  }
}


async function configureWallet() {
    try {
        // fake wallet its ok
        const wallet = {
          "kty": "RSA",
          "e": "AQAB",
          "n": "mbQVPpI9BVmnhYXFUMIsl35X2R04DxcuzptN44cbfaLIUB_5YsWU_OkZAnVPJDxEG9cbQ83BvL78rTMkt1fsT2W_zzkZCU7iP4OVPPS4uueMzf1QgnvQI2E5DuULYYo2ha-_gYpNEQPtPWUv3i1GDOeTwuIUecJgb77W0E4ecN-wMzROowOgpZ0zsu51TOlMHxmZ9cbFvrxEmIAo5Dtr8q4_a00m3zIJlglcC8l8tXfhBP82wajMtcEct1mnQXqROTJwwALGzAcmzA1C0KrsCtn3VQWlY3eRJoKmnX8aMDnJmU80ACZhIciDpKzz7fzA0PKiZxR73VWFVFUvebVgjO35jU2ilmWAqLFeScvRN4e3YEe63nC64RaYtVAUyhKMFuIDMMMdeuBBYyE_5zrNGRHtvQMq1gOjczVNhLiOBmpEqlerSYwuVUzvqbejDSdlDDSoMPOmg7G8DQhAzuHYoAEo8R2r-zYzjQ47fl2zFA2ko-sYxHrWBHKyxf2Esv0W_oaJSBSrJynQKtBcNt7dfScnnXN5B25VP2NTPBlHFVC09OxqgdUn9Kz48HWeBFbwvgU4c29KWoVbb_XrsGbDLXS4gI1JC6Ly7GIekrCfPrdgyb6U_mDRQxqfURVWNppo4b3o_HT07yjDKy48GK-CMdG9P5IDK8fdFGtsaKqjgi0",
          "d": "Jk5AISj29jdizZ8KDtdln5fIMv7aMsCXVLxVzAem7Ue9XmKpl1kgiWtaZUdxItm2K64PSHWl-_EpLc0aMGtEJIF6LR3QxIYZUrTrY5al10bPy6J_BxXuSHL5cmHY1UVJ00V6l8Es9bmhzXRDWr6zv5GTPLV1Xub3e8H27VEauwy0b_5wPqYvyjaEZOqS50kZRILv4NXaAHARNGR0THUWsROGEKrYrjVdODw66WEcqGko9kLYlakI458uFe_NBD-Uo8mTWfcXLk_19lKzvSdrzkSGJHVUw5ZP4WYcOhIsJ6qvOHsJvaPS_0VmsYq8_CnKsAhYOxJa0E14_gyA2Xc_iVpBsXJnCPctMtAce8aZ3SxLJLuYNI-EQ6zPr8yNQ0E6SYjV6zV1IfmVW5F0jmuQOXe8SyK6EZUAd9ONDv2n835NE60_LkjwwwTmSzjjBZm-V85HzEjN1SofSvF6y90WAE3GAGHIBM2eUuDkCblWbgl4vsVSG3_t7wxOL86o2fnet2cOzZdGzScPj1agPfUxW-kGzj-hRBnNWNlpCfaDsVKRcYSYU85LLMWndGMrQ6mA9laAKs14-EjM0RC-2wTTg49yGdhZOQomOPF9hNszJkfwCk8JykvtH8m29Uxwk4EpM8PZ9B8bHPmTnijJEGuPCRpJdkPiGbOhCGUVAo5rK40",
          "p": "-wII3Bo9YjzauRINU4Xfs0IhDUacGJYQ7l8D9tpIIJuba8rXWGhAgDboO80crH41N7z0HDPRHTzT_umpsy3fFvLPQ4QYpST1KgUD-ClmPbwg9nnCiZKaH-_vyFeXzfoXaB2uISI_vEBW8HBuCgmY-CPRZ6ep1A9TPfdmIRzHaaVg6-ZDZ8wIkxEqiw-G8w8ClIWIVpfU9uxDlt76GPZpKdWIYeCv8SGI7pf8ahwv-ZL0AHYdJU6UHPoJb_9zKiVWmyPMheupZ6zReBTZAOV1kTk6h0vbC20Iv2RGV42FkmljoeFpNbAqQM3qKcxYVWmCQl0Suec72nI3e7NJRXUi2w",
          "q": "nMKjfeREyk3B8XmdFPGdOyHMoC2RZD8oYjp3hjIYA5Bb0IJ8UQNi7X3ePVxZK3mNubfdDvIPtrxwSOsUnGi9kgmNjRQflL-dhS-0SldVndC0wEOtFZwiPyRrWw_kho53PBv7sJecMnm_VkhpwWxU229rrTrkKzZ-Y0eHGEkAZSX0OJAK9Y95Z6qiccnRTKplaDlsnN0gTKkgToRZVLFJy3OCM6UyGjWtIyxd-WzQSwyyB8q7xEol1VfTbnXb2EfAtBgvpBH8mMuU6GaSSXRD05B10ryeBEnqiEPxyE2TJTv2l9NZvTQvXgj5yhBXgA0bsEAdFivuVTqma9Jk-urJlw",
          "dp": "FjHo3KWJVf1xjbnV6dPFoxEu4QCkXtwuJRXLwPEuPYvk41QtVIjrYyr3wAn0BiCmzgXsQ-4lCIPPbxP0SH6-4kWYJC0zDK9G6m9FGZV3j-_prkG3_Pg0nqxVtI5iQvlhRniRZCamIhxCU8JtSH_uwcpRAuxlbPXp82nD4xurWmEgP9u9jBkTjQWQkHlQAoAKR13DX3zPfQIJO_b9gGWRiPxzscvvYtAHTqmrzSou58-hucS38QuQtzs4yGl7Infov5EbzZ-3_A3g-9BEG_suOSgpT7taZBlBE8NnIOjHrdmZ0L-g0PmB0vciRI3oJa1NslaOiFe1CCzfURXaXcTszw",
          "dq": "XhqB5tsXaJKRMJKe96mrh4ncuvNf6lv3tDAA_HAp9km8tEkAs-lig8shlJhRd0W7DJgRfh1VzY8FoOBuOQ6vbnGJpf1EkBkPSJrAkjgnT1uwhhKaXvShomIMiFfcCeKQNWdfCj2ZKLvpXrSNt-1-a1RRwWYu_rnx2UthD_US5aWJHENsMMl2SgMnDUPn_yvzQEPoraoY76w_lqLgtXTQJfArYzFyCEXcr9a8ezUVPVhbr03GtikE2TOl2xOpbAZ26iXyw32As4DS3Uhl3O6MoP6BnIZaHZz5y99tz56yDJIYkD_yCSDApqSgvupcfKRh0MZML7kjk8pniSZ-NBqp9Q",
          "qi": "SUMvdjii-AO5IpVIfspft05IDVj0sj5VkhoIRtuPUklI8Q9qH2kz33GwzrUu88CYnweF4HSobfYQruKC6QKp0I-v5hyLyQgBG1uQtZFW5BujGs4oIE8odUHgO0L0luklwXRl8H5SKO8wE8FjmdKqm2bvpJxDOxzBvmTh34JeycDxSEqZJKx9i-Ng4e1n3Zmq-7wTUwCIdlKwtjZUg7DGJD-Xn8JnPcYFb67U0h-tBRPFjLtCDxjFWS2QbvM7cH3Ww4sFZj_A4dJlS6WhyqfKDVtQKKraLlhFUb8mLy05z2ljVfqTY0msj01043xkQto6x5OtKc9Hyecr7sLL2krPcw"
        }
        const jwk = new ArweaveSigner(wallet)
        return jwk
    } catch (err) {
        console.log('Error configure\'ing Wallet')
    }
}

export {
    configureWallet, 
    warp
}