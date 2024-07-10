package com.lydia.lakeSidehotel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// 1. 只需要这个注解，告诉它是Spring程序即可

// 2. SpringBootApplication标注的类，就是主程序类
// 	  Spring只会扫描主程序所在的包，以及下面的包，自动的component-scan功能
//    自定义扫描路径：@SpringBootApplication(scanBasePackages="com.atguigu") or @ComponentScan("com.atguigu")

// 3. SpringBootApplication是这三个注解的总称：@SpringBootConfiguration @EnableAutoConfiguration @ComponentScan
@SpringBootApplication
public class LakeSideHotelApplication {

	public static void main(String[] args) {
		// SpringBoot把核心组件自动集成了，包括的核心组件dispatcherServlet, beanNameViewResolver, characterEncodingFilter, multipartResolver
		SpringApplication.run(LakeSideHotelApplication.class, args);
	}

}
