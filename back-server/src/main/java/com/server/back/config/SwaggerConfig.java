package com.server.back.config;


import com.server.back.common.entity.JwtProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.Tag;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
    //	Swagger-UI 3.x 확인
    //	http://localhost:8080/{your-app-root}/swagger-ui/index.html
    @Bean
    public Docket pochaApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .host("hmje.net")
                .consumes(getConsumeContentTypes())
                .produces(getProduceContentTypes())
                .apiInfo(apiInfo())
                .groupName("HongMinJeongEum")
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.ant("/**"))
                .build()
                .useDefaultResponseMessages(false)
                .securityContexts(Arrays.asList(securityContext()))
                .securitySchemes(Arrays.asList(apiKey()))
                .pathMapping("/")
                .apiInfo(this.ShopApiInfo());
    }
    private ApiInfo ShopApiInfo() {
        return new ApiInfoBuilder()
                .title("shop API")
                .description("shop API")
                .termsOfServiceUrl("http://localhost:8080")
                .version("1.0")
                .build();
    }


    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().title("HMJE Service API")
                .description("E102 Project")
                .version("1.0").build();
    }

    private Set<String> getConsumeContentTypes() {
        Set<String> consumes = new HashSet<>();
        consumes.add("application/json;charset=UTF-8");
        consumes.add("application/x-www-form-urlencoded");
        return consumes;
    }

    private Set<String> getProduceContentTypes() {
        Set<String> produces = new HashSet<>();
        produces.add("application/json;charset=UTF-8");
        return produces;
    }

    private ApiKey apiKey() {
        return new ApiKey("JWT", JwtProperties.HEADER_STRING, "header");
    }

    private SecurityContext securityContext() {
        return SecurityContext.builder().securityReferences(defaultAuth()).build();
    }

    private List<SecurityReference> defaultAuth(){
        AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] auth = new AuthorizationScope[1];
        auth[0] = authorizationScope;
        return Arrays.asList(new SecurityReference("JWT", auth));
    }
}
