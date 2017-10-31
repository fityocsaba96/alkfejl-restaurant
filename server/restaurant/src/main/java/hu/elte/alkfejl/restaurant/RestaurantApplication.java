package hu.elte.alkfejl.restaurant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@SpringBootApplication
public class RestaurantApplication extends WebMvcConfigurerAdapter {

    private HandlerInterceptor authInterceptor;

    @Autowired
    public RestaurantApplication(HandlerInterceptor authInterceptor) {
        this.authInterceptor = authInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authInterceptor);
    }

	public static void main(String[] args) {
		SpringApplication.run(RestaurantApplication.class, args);
	}
}
