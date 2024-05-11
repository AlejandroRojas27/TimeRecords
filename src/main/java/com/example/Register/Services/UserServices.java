package com.example.Register.Services;

import com.example.Register.Model.UserModel;
import com.example.Register.Repositories.UserRepository;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;

@Service
@Transactional
public class UserServices implements UserRepository {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    @Transactional
    public List<UserModel> getUsers(){
        String query = "FROM UserModel";
        return entityManager.createQuery(query).getResultList();
    }

    @Override
    public void saveUser(UserModel user){
        user.setCredential(updateCredential(user));
        entityManager.merge(user);}

    @Override
    public void updateUser(UserModel user) {entityManager.merge(user);}

    public String updateCredential(UserModel user){
        int num1 = (int) (Math.random() * 10);
        int num2= (int) (Math.random() * 10);
        int num3 = (int) (Math.random() * 10);
        String number = String.valueOf(num1) + String.valueOf(num2) + String.valueOf(num3);
        StringBuilder shortCurp = new StringBuilder(user.getCurp().substring(0,4));
        String generatedCredential = number + String.valueOf(shortCurp);
        String query = "FROM UserModel WHERE credential = :credential";

        List<UserModel> resultList = entityManager.createQuery(query).setParameter("credential", generatedCredential).getResultList();

        if(!resultList.isEmpty()){
            String secondTry = number;
            while (number==secondTry){
                num1 = (int) (Math.random() * 10);
                num2= (int) (Math.random() * 10);
                num3 = (int) (Math.random() * 10);
                number = String.valueOf(num1) + String.valueOf(num2) + String.valueOf(num3);
            }
            return number + String.valueOf(shortCurp);
        }else {return generatedCredential;}
    }

    @Override
    public UserModel findUserById(Long id) {return entityManager.find(UserModel.class, id);}

    @Override
    public void deleteUser(Long id) {
        UserModel user = entityManager.find(UserModel.class, id);
        entityManager.remove(user);}

    @Override
    public UserModel findUserByIdentifications(UserModel user) {
        String query = "FROM UserModel WHERE credential = :credential";
        List<UserModel> list = entityManager.createQuery(query).setParameter("credential", user.getCredential()).getResultList();

        if (list.isEmpty()){return null;}

        String passwordHashed = list.get(0).getPassword();
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);

        if (argon2.verify(passwordHashed, user.getPassword())){return list.get(0);}

        return null;
    }

    @Override
    public List<UserModel> findUserByCredential(String credential){
        String query = "FROM UserModel WHERE credential = :credential";
        return entityManager.createQuery(query).setParameter("credential", credential).getResultList();}

    @Override
    public List<UserModel> findUserByCurp(String curp){
        String query = "FROM UserModel WHERE curp = :curp";
        return entityManager.createQuery(query).setParameter("curp", curp).getResultList();}

}
