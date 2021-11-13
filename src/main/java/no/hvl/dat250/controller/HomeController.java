package no.hvl.dat250.controller;

import no.hvl.dat250.model.Poll;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
public class HomeController {
    @RequestMapping("/")
    @ResponseBody
    public String hello() {
        return "Welcome to /";
    }
}
