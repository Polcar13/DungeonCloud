/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.example.model;

import java.util.ArrayList;

/**
 *
 * @author Carlos
 */
public class Server {
    private int id;
    private String url;
    private String name;
    private ArrayList<User> members = new ArrayList<>();
    
    public Server() {
    }

    public int getId() {
        return id;
    }

    public String getUrl() {
        return url;
    }

    public String getName() {
        return name;
    }

    public ArrayList<User> getMembers() {
        return members;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setMembers(ArrayList<User> members) {
        this.members = members;
    }
    
    
}
