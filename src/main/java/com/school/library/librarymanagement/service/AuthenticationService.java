// package

// import com.school.library.librarymanagement.config.PasswordEncoderConfig;
// import com.school.library.librarymanagement.repository.UserRepository;

// @Service
// public class AuthenticationService {

//     @Autowired
//     private UserRepository userRepository;

//     @Autowired
//     private PasswordEncoder passwordEncoder;

//     public boolean authenticate(String contact, String rawPassword) {
//         return userRepository.findByContact(contact)
//             .map(user -> passwordEncoder.matches(rawPassword, user.getPassword()))
//             .orElse(false);
//     }
// }