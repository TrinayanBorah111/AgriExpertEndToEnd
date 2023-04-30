using AgriExpert.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace AgriExpert.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : Controller
    {
        private readonly IOrderRepository orderRepository;
        private readonly IMapper mapper;

        public OrderController(IOrderRepository orderRepository, IMapper mapper)
        {
            this.orderRepository = orderRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetAllExperts()
        {
            //Fetch data from database
            var orders = await orderRepository.GetAllAsync();
            //Convert data to DTO
            var ordersDTO = mapper.Map<List<Models.DTO.Orders>>(orders);
            //Return response
            return Ok(ordersDTO);
        }
        [HttpGet]
        [Route("{id:guid}")]
        [ActionName("GetOrderAsync")]
        //[Authorize(Roles = "Admin,Expert")]
        public async Task<IActionResult> GetOrderAsync(Guid id)
        {
            //Fetch data from database
            var order = await orderRepository.GetAsync(id);
            //Convert data to DTO
            var orderDTO = mapper.Map<Models.DTO.Orders>(order);
            //Return response
            return Ok(orderDTO);
        }
        [HttpPost]
        //[Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddOrdersAsync([FromBody] Models.DTO.AddOrderRequest addOrderRequest)
        {
            //Validate Expert data
            if (!ValidateAddOrderAsync(addOrderRequest))
            {
                return BadRequest(ModelState);
            }
            //Convert DTO to domain object
            var order = new Models.Forum.Orders
            {
                OrdersRequirement = addOrderRequest.OrdersRequirement,
                OrdersPhone = addOrderRequest.OrdersPhone,
                OrdersAddress = addOrderRequest.OrdersAddress,
                CustomersId = addOrderRequest.CustomersId,
            };
            //Pass domain object to repository to persist the data
            await orderRepository.AddAsync(order);
            //Convert the domain object to DTO
            var orderDTO = new Models.DTO.Orders
            {
                OrdersId = order.OrdersId,
                OrdersAddress = order.OrdersAddress,
                OrdersPhone = order.OrdersPhone,
                OrdersRequirement = order.OrdersRequirement,
            };
            //Send DTO back to client
            return CreatedAtAction(nameof(GetOrderAsync), new { id = orderDTO.OrdersId }, orderDTO);
        }
        #region Private methods
        private bool ValidateAddOrderAsync(Models.DTO.AddOrderRequest addOrderRequest)
        {
            if (addOrderRequest == null)
            {
                ModelState.AddModelError(nameof(addOrderRequest), $"Experts data is required.");
                return false;
            }
            if (string.IsNullOrEmpty(addOrderRequest.OrdersPhone))
            {
                ModelState.AddModelError(nameof(addOrderRequest.OrdersPhone), $"{nameof(addOrderRequest.OrdersPhone)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(addOrderRequest.OrdersAddress))
            {
                ModelState.AddModelError(nameof(addOrderRequest.OrdersAddress), $"{nameof(addOrderRequest.OrdersAddress)} cannot be empty.");
            }
            if (string.IsNullOrEmpty(addOrderRequest.OrdersRequirement))
            {
                ModelState.AddModelError(nameof(addOrderRequest.OrdersRequirement), $"{nameof(addOrderRequest.OrdersRequirement)} cannot be empty.");
            }
            if (ModelState.ErrorCount > 0)
            {
                return false;
            }
            return true;
        }
        #endregion
    }
}
