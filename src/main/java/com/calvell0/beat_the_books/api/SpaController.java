package com.calvell0.beat_the_books.api;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
class SpaController {

    // top‑level routes like /teams or /login
    @GetMapping("/{path:^(?!api$).*$}")
    public String anyTopLevel() {
        return "forward:/index.html";
    }

    // nested routes like /teams/steelers or /settings/profile
    @GetMapping("/{path:^(?!api$).*$}/**")
    public String anySubLevel() {
        return "forward:/index.html";
    }
}
