﻿using AgriExpert.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace AgriExpert.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PhonePeController : ControllerBase
    {
        private const string SaltKey = "d16d6324-c797-42cc-b669-55b05700c2f3";
        private const string SaltIndex = "###1";

        [HttpPost("/pg/v1/payment")]
        public async Task<IActionResult> MakePayment([FromBody] PaymentRequest paymentRequest)
        {
            try
            {
                decimal packagePrice = paymentRequest.PackagePrice;
                Guid packageID = paymentRequest.PackageID;
                var paymentData = new
                {
                    merchantId = "AGRIEXPERTONLINE",
                    merchantTransactionId = GenerateMerchantTransactionId(),
                    merchantUserId = "AgriEx2023",
                    amount = packagePrice * 100,
                    redirectUrl = "https://agriexpertt.com/CallbackLoadingPage",
                    redirectMode = "REDIRECT",
                    callbackUrl = "https://agriexpertt.com/PhonePeCallback/callback",
                    mobileNumber = "9435738010",
                    paymentInstrument = new
                    {
                        type = "PAY_PAGE"
                    }
                };

                var jsonData = JsonSerializer.Serialize(paymentData);
                var base64Data = Convert.ToBase64String(Encoding.UTF8.GetBytes(jsonData));
                var concatenatedData = base64Data + "/pg/v1/pay" + SaltKey;

                var client = new HttpClient();

                using (SHA256 sha256 = SHA256.Create())
                {
                    byte[] hashBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(concatenatedData));
                    var hashString = BitConverter.ToString(hashBytes).Replace("-", "").ToLower();

                    var xVerifyHeaderValue = hashString + SaltIndex;

                    var request = new HttpRequestMessage
                    {
                        Method = HttpMethod.Post,
                        RequestUri = new Uri("https://api.phonepe.com/apis/hermes/pg/v1/pay"),
                        Headers =
                        {
                            { "accept", "application/json" },
                            { "X-VERIFY", xVerifyHeaderValue },
                        },
                        Content = new StringContent("{\"request\":\"" + base64Data + "\"}")
                        {
                            Headers =
                            {
                                ContentType = new MediaTypeHeaderValue("application/json")
                            }
                        }
                    };

                    using (var response = await client.SendAsync(request))
                    {
                        response.EnsureSuccessStatusCode();
                        var responseBody = await response.Content.ReadAsStringAsync();
                        return Ok(responseBody);
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        private string GenerateMerchantTransactionId()
        {
            var timestamp = DateTimeOffset.Now.ToUnixTimeMilliseconds();
            var random = new Random();
            var randomNumber = random.Next(100000, 999999);
            return $"AE{timestamp}{randomNumber}";
        }
    }

    public class PaymentRequest
    {
        public Guid PackageID { get; set; }
        public decimal PackagePrice { get; set; }
    }
}
