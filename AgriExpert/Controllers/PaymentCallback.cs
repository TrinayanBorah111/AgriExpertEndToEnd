using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;

namespace AgriExpert.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PhonePeCallbackController : ControllerBase
    {
        private static CallbackData _callbackData; // Store the callback data

        // Existing callback endpoint
        [HttpPost("callback")]
        public async Task<IActionResult> HandleCallbackAsync()
        {
            try
            {
                using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
                {
                    var requestBody = await reader.ReadToEndAsync();

                    var jsonObject = JsonDocument.Parse(requestBody).RootElement;
                    var dataFieldValue = jsonObject.GetProperty("response").GetString();

                    var jsonBytes = Convert.FromBase64String(dataFieldValue);
                    var decodedJson = Encoding.UTF8.GetString(jsonBytes);

                    _callbackData = JsonSerializer.Deserialize<CallbackData>(decodedJson);

                    Console.WriteLine("PhonePe Callback Data:");
                    Console.WriteLine(decodedJson);

                    Console.WriteLine(_callbackData.code);
                    return Ok(new { code = _callbackData.code });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error handling PhonePe callback:");
                Console.WriteLine(ex.Message);
                return StatusCode(500, "An error occurred while processing the callback.");
            }
        }

        // New endpoint to retrieve the callback code
        [HttpGet("getCode")]
        public IActionResult GetCode()
        {
            try
            {
                if (_callbackData != null)
                {
                    var callbackCode = _callbackData.code;
                    var transactionDetials = _callbackData.data;
                    return Ok(new { code = callbackCode, data = transactionDetials });
                }
                else
                {
                    return BadRequest("Callback data not available.");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error handling callback code request:");
                Console.WriteLine(ex.Message);
                return StatusCode(500, "An error occurred while processing the request.");
            }
        }

        public class CallbackData
        {
            public string code { get; set; }
            public object data { get; set; }    
        }
    }
}
