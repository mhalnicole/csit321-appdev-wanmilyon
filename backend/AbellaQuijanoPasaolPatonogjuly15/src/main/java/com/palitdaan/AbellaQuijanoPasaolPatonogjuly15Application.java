package com.palitdaan;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.persistence.autoconfigure.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages = "com.palitdaan")
@EntityScan(basePackages = "com.palitdaan")
@EnableJpaRepositories(basePackages = "com.palitdaan")
public class AbellaQuijanoPasaolPatonogjuly15Application {

	public static void main(String[] args) {
		SpringApplication.run(AbellaQuijanoPasaolPatonogjuly15Application.class, args);
	}

}
