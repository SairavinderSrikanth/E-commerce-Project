import React from 'react'
import './DescriptionBox.css'
const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
        <div className="descriptionbox-navigator">
            <div className="descriptionbox-nav-box">Decription</div>
            <div className="descriptionbox-nav-box fade">Reviews(122)</div>
        </div>
        <div className="descriptionbox-description">
            <p>An e-commerce website is an online platform where businesses and individuals can buy and sell goods or services over the internet. 
                These websites allow customers to browse products, add them to a virtual shopping cart, 
                and proceed to a secure checkout process where payment and shipping information are provided.
            </p>
            <p>E-commerce websites can vary widely in terms of scale, functionality, and design. 
                They can range from small, single-product stores to large, multi-category marketplaces. 
                Many e-commerce websites offer features such as search filters, product reviews, secure payment gateways, order tracking, and customer support.
            </p>

        </div>
    </div>
  )
}

export default DescriptionBox