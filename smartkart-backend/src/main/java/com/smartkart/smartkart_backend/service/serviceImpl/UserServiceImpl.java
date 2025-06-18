package com.smartkart.smartkart_backend.service.serviceImpl;

import com.smartkart.smartkart_backend.dto.LoginResponse;
import com.smartkart.smartkart_backend.dto.RegisterUser;
import com.smartkart.smartkart_backend.model.User;
import com.smartkart.smartkart_backend.repository.UserRepository;
import com.smartkart.smartkart_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(12);

    @Override
    public User registerUser(RegisterUser request) {
        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            return null;
        }
        User user =new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(encoder.encode(request.getPassword()));
        user.setRole("USER");

        userRepository.save(user);
        return user;
    }

//    @Override
//    public String verify(RegisterUser user) {
//        Authentication authenticate=
//                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));
//        if(authenticate.isAuthenticated())
//            return jwtService.generateToken(user.getEmail());
//        return "Fail";
//    }

    @Override
    public LoginResponse verify(RegisterUser user) {
        String token="";
        Authentication authenticate=
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));
        if(authenticate.isAuthenticated()){
            token= jwtService.generateToken(user.getEmail());
            LoginResponse login=new LoginResponse();
            User userdata=userRepository.findByEmail(user.getEmail()).get();
            login.setEmail(user.getEmail());
            login.setToken(token);
            login.setRole(userdata.getRole());
            return login;
        }else {
            return null;
        }


    }

    @Override
    public List<User> getAllUser() {
        return userRepository.findAll();
    }


}
