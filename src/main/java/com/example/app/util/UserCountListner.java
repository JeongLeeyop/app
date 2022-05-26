package com.example.app.util;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSessionEvent;
import javax.servlet.http.HttpSessionListener;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationStartedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

@Component
public class UserCountListner implements ApplicationListener<ApplicationStartedEvent>, HttpSessionListener {
    @Autowired
    private ServletContext servletContext;

    public Integer userCount = 0;

    @Override
    public void onApplicationEvent(ApplicationStartedEvent event) {
    }

    @Override
    public void sessionCreated(HttpSessionEvent sessionEve) {

        // 세션이 새로 생성되면 execute() 실행한다.
        if (sessionEve.getSession().isNew()) {
            execute(sessionEve);
        }
    }

    private void execute(HttpSessionEvent sessionEve) {
        if (userCount == null) {
            userCount = 0;
        }
        userCount++;
        servletContext.setAttribute("userCount", userCount);
    }

    @Override
    public void sessionDestroyed(HttpSessionEvent arg0) {
    }


}

